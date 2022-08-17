"use strict";

import { ProcedureContext, ProcedureDef } from "./types-ggs_backups";

import { UGs } from "./table-control_estructura";

export const Proceduresggs_backups: ProcedureDef[] = [
  {
    action: "imputar_ug",
    parameters: [{ name: "tipo_imputacion", typeName: "text" }],
    progress: true,
    coreFunction: async function (context: ProcedureContext, parameters: any) {
      const { client } = context;
      if (
        parameters.tipo_imputacion != "comun" &&
        parameters.tipo_imputacion != "especial"
      ) {
        throw new Error("El tipo de imputacion no es comun");
      }
      context.informProgress({ message: "control de lotes" });
      var {
        row: { ultimo_lote_imputado },
      } = await client
        .query(
          `
                select lote as ultimo_lote_imputado from lotes where imputado is true order by lote desc limit 1;
            `
        )
        .fetchUniqueRow("No hay lote imputado");
      var {
        row: { ultimo_lote_sin_imputar },
      } = await client
        .query(
          `
                select lote as ultimo_lote_sin_imputar from lotes where imputado is not true and lote > $1  order by lote desc limit 1
            `,
          [ultimo_lote_imputado]
        )
        .fetchUniqueRow(
          "No hay lote sin imputar posterior al ultimo lote imputado"
        );
      for (var ug of UGs) {
        if (ug.imputables) {
          await client
            .query(
              `update externos e set ${ug.targetField} = 0 where lote = $1 and ${ug.targetField} is distinct from 0;`,
              [ultimo_lote_sin_imputar]
            )
            .execute();
        }
      }
      var result = await client
        .query(
          `
                update externos e 
                set provincia    = a.provincia   ,
                    comuna       = a.comuna      ,
                    departamento = a.departamento,
                    fraccion     = a.fraccion    ,
                    radio        = a.radio       ,
                    segmento     = a.segmento
                from externos a
                where e.dni = a.dni
                  and e.puesto_externo = a.puesto_externo
                  and e.dni_postulo = a.dni_postulo
                  and e.departamento = 0
                  and a.lote = $1
                  and e.lote = $2;
                `,
          [ultimo_lote_imputado, ultimo_lote_sin_imputar]
        )
        .execute();
      context.informProgress({
        message: "copia del lote anterior " + result.rowCount,
      });
      var maximaRepeticion = 10;
      var repeticion = 1;
      var cambiosAnteriores: Number;
      var cambios: Number = Number.MAX_SAFE_INTEGER;
      do {
        cambiosAnteriores = cambios;
        cambios = (
          await client
            .query(
              `
                    update externos e 
                    set provincia = p.provincia,
                        comuna = p.comuna,
                        departamento = p.departamento,
                        fraccion = p.fraccion,
                        radio = p.radio,
                        segmento = p.segmento
                    from externos p -- p = postulante o sea padre
                    where p.dni = e.dni_postulo and p.lote = e.lote
                        and p.deshabilitado is not true
                        and e.departamento = 0
                        and e.lote = $1;
                    `,
              [ultimo_lote_sin_imputar]
            )
            .execute()
        ).rowCount;
        context.informProgress({
          message: `imputación paso ${repeticion} registros ${cambios}`,
        });
      } while (repeticion++ < maximaRepeticion && cambios < cambiosAnteriores);
      result = await client
        .query(
          `update externos e set comuna = departamento/7 where comuna is distinct from departamento/7 and lote=$1;`,
          [ultimo_lote_sin_imputar]
        )
        .execute();
      context.informProgress({
        message: "cambio de comuna " + result.rowCount,
      });
      result = await client
        .query(`update lotes set imputado = true where lote = $1`, [
          ultimo_lote_sin_imputar,
        ])
        .execute();
      context.informProgress({
        message: "marcado del lote " + result.rowCount,
      });
      return `imputado el lote "${ultimo_lote_sin_imputar}" basandose en el lote "${ultimo_lote_imputado}" con "${repeticion}" iteraciones`;
    },
  },
];
