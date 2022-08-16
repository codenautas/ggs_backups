"use strict";

import { TableDefinition, TableContext } from "./types-ggs_backups";

export function dotacion(context: TableContext): TableDefinition {
  var { isProcesamiento } = context;
  return {
    name: "dotacion",
    elementName: "dotación",
    title: "dotación",
    editable: isProcesamiento,
    fields: [
      { name: "comuna", typeName: "integer" },
      { name: "departamento", typeName: "integer" },
      { name: "fraccion", typeName: "integer" },
      { name: "radios", typeName: "integer" },
      { name: "asistentes", typeName: "integer" },
      { name: "cvc", typeName: "integer" },
      { name: "cvp_min", typeName: "integer" },
      { name: "cvp_max", typeName: "integer" },
      { name: "bapi", typeName: "text", isName: true },
    ],
    primaryKey: ["departamento", "fraccion"],
    detailTables: [
      {
        table: "ultimo_externos",
        abr: "R",
        fields: ["departamento", "fraccion"],
      },
    ],
  };
}
