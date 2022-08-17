"use strict";

import { TableDefinition, TableContext } from "./types-ggs_backups";

export const defOpts_externos_personal = {
  ultimoLote: false,
};

export function sql_externos_personal(
  options: typeof defOpts_externos_personal
) {
  return `(select L.lote, dni, 
        p.comuna,
        p.fraccion,
        p.radio,
        p.segmento,
        coalesce(e.departamento) as d,
        coalesce(e.fraccion    ) as f,
        coalesce(e.radio       ) as r,
        coalesce(e.segmento    ) as s,
        e.nombre_puesto_externo as p,
     case when p.dni is null then 'I' when e.dni is null then 'D' else null end as dif1,
     case when p.dni is not null and e.dni is not null then nullif(concat(
         case when upper(translate(p.apellido,'ÁÉÍÓÚáéíóúÜü','AEIOUaeiouUu')) is distinct from upper(translate(e.apellido,'ÁÉÍÓÚáéíóúÜü','AEIOUaeiouUu')) then 'A' else null end,
         case when upper(translate(p.nombre,'ÁÉÍÓÚáéíóúÜü','AEIOUaeiouUu')) is distinct from upper(translate(e.nombre,'ÁÉÍÓÚáéíóúÜü','AEIOUaeiouUu')) then 'N' else null end,
         case when p.puesto is distinct from e.puesto_externo and mp.externo is distinct from e.nombre_puesto_externo then 'P' else null end
     ),'') else null end as difs,
     case when coalesce(e.departamento,0) <> coalesce(p.comuna*7,0) then 'D'
        when coalesce(e.fraccion      ,0) <> coalesce(p.fraccion,0) then 'F'
        when coalesce(e.radio         ,0) <> coalesce(p.radio   ,0) then 'R'
        when coalesce(e.segmento      ,0) <> coalesce(p.segmento,0) then 'S'
        else null
     end as difug,
     P.lote lote_personal, P.apellido apellido_personal, P.nombre nombre_personal, P.puesto puesto_personal, 
     nombre_archivo, E.apellido apellido_externo, E.nombre nombre_externo, E.puesto_externo, e.nombre_puesto_externo, e.lote lote_externo, e.completo_perfil, e.capacitacion
     --, (select count(*) from externos e2 where e2.lote=e.lote and e2.dni=e.dni and e2.deshabilitado = 'false') as duplicidad
         from ${
           options.ultimoLote
             ? `(select * from lotes where imputado is true order by lote desc limit 1)`
             : `lotes`
         } L, 
             lateral (select * from externos e where deshabilitado is not true and e.lote=L.lote) E
             full outer join (select * from personal p where estado <> 'BAJA') P using(dni)
             left join match_puestos mp on (mp.puesto = p.puesto)
 )`;
}

export function externos_personal(
  _context: TableContext,
  opts?: Partial<typeof defOpts_externos_personal>
): TableDefinition {
  var options = { ...defOpts_externos_personal, ...opts };
  var definition: TableDefinition = {
    name: "externos_personal",
    elementName: "externo_personal",
    title: "matcheo de personal con externos",
    editable: false,
    fields: [
      { name: "lote", typeName: "integer" },
      { name: "dni", typeName: "text" },
      // {name:'duplicidad'          ,typeName:'bigint'  , description:'mayor a uno significa DNI repetido'} ,
      {
        name: "dif1",
        typeName: "text",
        description: "I=solo Externo, D=solo DGEyC, A=ambos",
      },
      {
        name: "difs",
        typeName: "text",
        description: "acumulación de A=Apellido, N=nombre, P=Puesto",
      },
      {
        name: "difug",
        typeName: "text",
        description: "primera diferencia en UG",
      },
      { name: "comuna", typeName: "integer" },
      { name: "fraccion", typeName: "integer" },
      { name: "radio", typeName: "integer" },
      { name: "segmento", typeName: "integer" },
      { name: "d", typeName: "integer", description: "departamento externo" },
      { name: "f", typeName: "integer", description: "fracción externa" },
      { name: "r", typeName: "integer", description: "radio externo" },
      { name: "s", typeName: "integer", description: "segmento externo" },
      { name: "apellido_personal", typeName: "text" },
      { name: "nombre_personal", typeName: "text" },
      { name: "puesto_personal", typeName: "text" },
      { name: "lote_personal", typeName: "integer" },
      { name: "apellido_externo", typeName: "text" },
      { name: "nombre_externo", typeName: "text" },
      { name: "puesto_externo", typeName: "text" },
      { name: "nombre_puesto_externo", typeName: "text" },
      { name: "completo_perfil", typeName: "text" },
      { name: "capacitacion", typeName: "text" },
    ],
    sql: {
      isTable: false,
      from: sql_externos_personal(options),
    },
    primaryKey: ["lote", "dni"],
  };
  return definition;
}

export function ultimo_externos_personal(
  context: TableContext
): TableDefinition {
  return externos_personal(context, { ultimoLote: true });
}
