"use strict";

import { TableDefinition, TableContext } from "./types-ggs_backups";

export function comunas(context: TableContext): TableDefinition {
  var { isAdmin } = context;
  return {
    name: "comunas",
    elementName: "comuna",
    editable: isAdmin,
    fields: [
      { name: "provincia", typeName: "integer" },
      { name: "comuna", typeName: "integer" },
      { name: "departamento", typeName: "integer" },
    ],
    primaryKey: ["provincia", "comuna"],
    constraints: [
      { constraintType: "unique", fields: ["comuna"] },
      { constraintType: "unique", fields: ["provincia", "departamento"] },
    ],
    foreignKeys: [{ references: "provincias", fields: ["provincia"] }],
    detailTables: [
      { table: "fracciones", abr: "F", fields: ["provincia", "comuna"] },
      { table: "radios", abr: "R", fields: ["provincia", "comuna"] },
      { table: "sedes", abr: "L", fields: ["provincia", "comuna"] },
      { table: "personal", abr: "P", fields: ["provincia", "comuna"] },
    ],
  };
}
