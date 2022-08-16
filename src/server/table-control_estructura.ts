"use strict";

import { TableDefinition, TableContext } from "./types-ggs_backups";

export const defOpts_estructura = {
  ultimoLote: false,
  nivelGeo: 0,
};

export const UGs = [
  { abr: "d", targetField: "departamento", imputables: true },
  { abr: "f", targetField: "fraccion", imputables: true },
  { abr: "r", targetField: "radio", imputables: true },
  { abr: "s", targetField: "segmento", imputables: true },
];

export const Puestos = [
  { abr: "i JD", nombre: "Jefe Departamento" },
  { abr: "i JF", nombre: "Jefe Fracción" },
  { abr: "i JR", nombre: "Jefe Radio" },
  { abr: "i AJF", nombre: "Asistente Jefe Fracción" },
  { abr: "i CVC", nombre: "Censistas Viviendas Colectiva" },
  { abr: "i CVP", nombre: "Censistas Viviendas Particulares" },
];

import { FieldDefinition } from "backend-plus";

function sql_control_estructura(options: typeof defOpts_estructura) {
  var ug = UGs.slice(0, options.nivelGeo)
    .map((x) => " ," + x.targetField)
    .join("");
  return `(
    select lote ${UGs.slice(0, options.nivelGeo)
      .map((x) => " ," + x.targetField + " as " + x.abr)
      .join("")}
    ${Puestos.map(
      (p) => `
        , count(*) filter (where nombre_puesto_indec = '${p.nombre}') as "${p.abr}"
    `
    ).join("")}
    from externos x
    where true ${UGs.slice(0, options.nivelGeo)
      .map((x) => " and " + x.targetField + " <> 0")
      .join("")}
        and deshabilitado is not true
        and lote = (select max(lote) from lotes where imputado)
    group by lote ${ug}
    order by lote ${ug}
    )`;
}

export function control_estructura(
  _context: TableContext,
  opts?: Partial<typeof defOpts_estructura>
): TableDefinition {
  var options = { ...defOpts_estructura, ...opts };
  var definition: TableDefinition = {
    name: `${options.ultimoLote ? "ultimo_" : ""}control_estructura${
      options.nivelGeo ? "_" + UGs[options.nivelGeo - 1].abr : ""
    }`,
    elementName: "estructura",
    editable: false,
    fields: [
      { name: "lote", typeName: "integer" },
      ...UGs.slice(0, options.nivelGeo).map(
        (x) => ({ name: x.abr, typeName: "integer" } as FieldDefinition)
      ),
      ...Puestos.map(
        (x) =>
          ({
            name: x.abr,
            typeName: "integer",
            aggregate: "sum",
          } as FieldDefinition)
      ),
      ...(opts?.nivelGeo == 2
        ? [
            {
              name: "JR",
              typeName: "integer",
              aggregate: "sum",
            } as FieldDefinition,
            {
              name: "Δ JR",
              typeName: "integer",
              aggregate: "sum",
            } as FieldDefinition,
            {
              name: "AJF",
              typeName: "integer",
              aggregate: "sum",
            } as FieldDefinition,
            {
              name: "Δ AJF",
              typeName: "integer",
              aggregate: "sum",
            } as FieldDefinition,
            {
              name: "CVC",
              typeName: "integer",
              aggregate: "sum",
            } as FieldDefinition,
            {
              name: "Δ CVC",
              typeName: "integer",
              aggregate: "sum",
            } as FieldDefinition,
            {
              name: "CVP min",
              typeName: "integer",
              aggregate: "sum",
            } as FieldDefinition,
            {
              name: "Δ CVP min",
              typeName: "integer",
              aggregate: "sum",
            } as FieldDefinition,
            {
              name: "CVP max",
              typeName: "integer",
              aggregate: "sum",
            } as FieldDefinition,
            {
              name: "Δ CVP max",
              typeName: "integer",
              aggregate: "sum",
            } as FieldDefinition,
          ]
        : []),
    ],
    primaryKey: ["lote", ...UGs.slice(0, options.nivelGeo).map((x) => x.abr)],
    sql: {
      isTable: false,
      from:
        opts?.nivelGeo == 2
          ? `(select *, 
                    radios     as "JR",
                    asistentes as "AJF",
                    cvc        as "CVC",
                    cvp_min    as "CVP min",
                    cvp_max    as "CVP max",
                    - radios    + "i JR"  as "Δ JR", 
                    - asistentes+ "i AJF" as "Δ AJF",
                    - cvc       + "i CVC" as "Δ CVC",
                    - cvp_min   + "i CVP" as "Δ CVP min",
                    - cvp_max   + "i CVP" as "Δ CVP max"
                from ${sql_control_estructura(options)} x
                    left join dotacion d on x.d = d.departamento and x.f = d.fraccion
            )`
          : sql_control_estructura(options),
    },
    detailTables: [
      ...UGs.slice(options.nivelGeo).map((x) => ({
        table: `control_estructura_${x.abr}`,
        fields: ["lote", ...UGs.slice(0, options.nivelGeo).map((x) => x.abr)],
        abr: x.abr,
      })),
      {
        table: "externos",
        abr: "e",
        fields: [
          "lote",
          ...UGs.slice(0, options.nivelGeo).map((x) => ({
            source: x.abr,
            target: x.targetField,
          })),
        ],
      },
    ],
  };
  return definition;
}

export function control_estructura_d(context: TableContext) {
  return control_estructura(context, { nivelGeo: 1 });
}
export function control_estructura_f(context: TableContext) {
  return control_estructura(context, { nivelGeo: 2 });
}
export function control_estructura_r(context: TableContext) {
  return control_estructura(context, { nivelGeo: 3 });
}
export function control_estructura_s(context: TableContext) {
  return control_estructura(context, { nivelGeo: 4 });
}

export function ultimo_control_estructura(
  context: TableContext
): TableDefinition {
  return control_estructura(context, { ultimoLote: true });
}
