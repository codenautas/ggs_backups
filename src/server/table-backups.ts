"use strict";

import { TableDefinition } from "./types-ggs_backups";

export function backups(): TableDefinition {
  var definition: TableDefinition = {
    name: "backups",
    elementName: "backup",
    title: "Backups",
    tableName: "backups",
    editable:true,
    allow: {import:true},
    fields: [
      //campo propios:
      { name: "lote", typeName: "integer" },
      { name: "verificado", typeName: "text"},
      //campos fuentes externas:
      { name: "respid", typeName: "text", specialValueWhenInsert: "lineNumberWhenImported", editable:false},
      { name: "name", typeName: "text", title: "nombre", editable:false },
      { name: "dni", typeName: "text", title: "DNI", editable:false },
    ],
    primaryKey: ["lote", "respid"],
    foreignKeys: [{ references: "lotes", fields: ["lote"] }],
    // hiddenColumns: [
    //    "modificado",
    // ],
  };
  return definition;
}
