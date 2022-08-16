"use strict";

import { TableDefinition, TableContext } from "./types-ggs_backups";

export function sedes(context: TableContext): TableDefinition {
  var { isProcesamiento } = context;
  return {
    name: "sedes",
    elementName: "sede",
    editable: isProcesamiento,
    fields: [
      { name: "sede", typeName: "text" },
      { name: "nombre_sede", typeName: "text" },
      { name: "domicilio", typeName: "text" },
      {
        name: "provincia",
        typeName: "integer",
        editable: false,
        visible: false,
        defaultDbValue: "2",
      },
      { name: "comuna", typeName: "integer" },
      { name: "fraccion", typeName: "integer" },
      { name: "radio", typeName: "integer" },
      { name: "observaciones", typeName: "text" },
      { name: "responsables", typeName: "text" },
      { name: "cant", typeName: "bigint", inTable: false, editable: false },
      { name: "codigo_depto", typeName: "integer", title: "Código depto" },
      {
        name: "localidad",
        typeName: "text",
        editable: false,
        visible: false,
        defaultDbValue: "CABA",
      },
      { name: "codigo_postal", typeName: "text", title: "Código postal" },
      { name: "telefono", typeName: "text", title: "Teléfono" },
    ],
    primaryKey: ["sede"],
    foreignKeys: [
      { references: "provincias", fields: ["provincia"] },
      { references: "comunas", fields: ["provincia", "comuna"] },
      { references: "fracciones", fields: ["provincia", "comuna", "fraccion"] },
    ],
    detailTables: [
      { table: "personal", abr: "P", label: "personal", fields: ["sede"] },
    ],
    sql: {
      fields: {
        cant: {
          expr: "(select count(*) from personal where personal.sede = sedes.sede)",
        },
      },
    },
  };
}
