"use strict";

import { TableDefinition, TableContext } from "./types-ggs_backups";

export function match_puestos(context: TableContext): TableDefinition {
  var { isAdmin } = context;
  return {
    name: "match_puestos",
    elementName: "match de puesto",
    editable: isAdmin,
    fields: [
      { name: "puesto", typeName: "text" },
      { name: "externo", typeName: "text" },
    ],
    primaryKey: ["puesto", "externo"],
    foreignKeys: [{ references: "puestos", fields: ["puesto"], alias: "pu" }],
  };
}
