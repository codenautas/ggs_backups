"use strict";

import { TableDefinition, TableContext } from "./types-ggs_backups";

export function equipos(context: TableContext): TableDefinition {
  var { isAdmin } = context;
  return {
    name: "equipos",
    elementName: "equipo",
    editable: isAdmin,
    fields: [
      { name: "equipo", typeName: "text" },
      { name: "descripcion", typeName: "text" },
    ],
    primaryKey: ["equipo"],
    detailTables: [{ table: "puestos", abr: "P", fields: ["equipo"] }],
  };
}
