"use strict";

import { TableDefinition } from "./types-ggs_backups";

export function backups(): TableDefinition {
  var definition: TableDefinition = {
    name: "backups",
    elementName: "backup",
    title: "Backups",
    tableName: "backups",
    editable: false,
    fields: [
      //campo propios:
      { name: "lote", typeName: "integer" },
      { name: "verificado", typeName: "text", editable:true },
      //campos fuentes externas:
      { name: "respid", typeName: "text", specialValueWhenInsert: "lineNumberWhenImported"},
      { name: "name", typeName: "text", title: "DNI" },
      { name: "dni", typeName: "text", title: "DNI" },
    ],
    primaryKey: ["lote", "respid"],
    foreignKeys: [{ references: "lotes", fields: ["lote"] }],
    // hiddenColumns: [
    //    "modificado",
    // ],
  };
  return definition;
}
