"use strict";

import { TableDefinition, TableContext } from "./types-ggs_backups";

export function fracciones(context: TableContext): TableDefinition {
  var { isProcesamiento } = context;
  return {
    name: "fracciones",
    elementName: "fracción",
    title: "fracciones",
    editable: isProcesamiento,
    fields: [
      { name: "provincia", typeName: "integer", defaultDbValue: "2" },
      { name: "comuna", typeName: "integer" },
      { name: "fraccion", typeName: "integer" },
    ],
    primaryKey: ["provincia", "comuna", "fraccion"],
    foreignKeys: [{ references: "comunas", fields: ["provincia", "comuna"] }],
    detailTables: [
      {
        table: "radios",
        abr: "R",
        fields: ["provincia", "comuna", "fraccion"],
      },
      { table: "sedes", abr: "L", fields: ["provincia", "comuna", "fraccion"] },
      {
        table: "personal",
        abr: "P",
        fields: ["provincia", "comuna", "fraccion"],
      },
    ],
  };
}
