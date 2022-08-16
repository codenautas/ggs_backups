"use strict";

import { TableDefinition, TableContext } from "./types-ggs_backups";

export function radios(context: TableContext): TableDefinition {
  var { isProcesamiento } = context;
  return {
    name: "radios",
    elementName: "radio",
    editable: isProcesamiento,
    fields: [
      { name: "provincia", typeName: "integer", defaultDbValue: "2" },
      { name: "comuna", typeName: "integer" },
      { name: "fraccion", typeName: "integer" },
      { name: "radio", typeName: "integer" },
      { name: "nombre_bapis", typeName: "text" },
      { name: "a_cargo", typeName: "text" },
    ],
    primaryKey: ["provincia", "comuna", "fraccion", "radio"],
    foreignKeys: [
      { references: "fracciones", fields: ["provincia", "comuna", "fraccion"] },
    ],
    detailTables: [
      {
        table: "personal",
        abr: "P",
        label: "personal",
        fields: ["provincia", "comuna", "fraccion", "radio"],
      },
    ],
  };
}
