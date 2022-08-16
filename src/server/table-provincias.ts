"use strict";

import { TableDefinition, TableContext } from "./types-ggs_backups";

export function provincias(context: TableContext): TableDefinition {
  var admin = context.user.rol === "admin";
  return {
    name: "provincias",
    elementName: "provincia",
    editable: admin,
    fields: [
      { name: "provincia", typeName: "integer" },
      { name: "nombre", typeName: "text" },
    ],
    primaryKey: ["provincia"],
    detailTables: [
      { table: "comunas", abr: "C", label: "comunas", fields: ["provincia"] },
      { table: "personal", abr: "P", label: "personal", fields: ["provincia"] },
    ],
  };
}
