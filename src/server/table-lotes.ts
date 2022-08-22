"use strict";

import { TableDefinition, TableContext } from "./types-ggs_backups";

export function lotes(context: TableContext): TableDefinition {
  var { isRecepcion, isProcesamiento } = context;
  return {
    name: "lotes",
    elementName: "lote",
    editable: isRecepcion,
    fields: [
      { name: "lote", typeName: "integer", specialDefaultValue: "next_number" },
      { name: "recepcion", typeName: "date", specialDefaultValue: "current_date"},
      { name: "observaciones", typeName: "text", isName: true },
      { name: "procesamiento", typeName: "text", editable: isProcesamiento },
      { name: "cant", typeName: "bigint", inTable: false, editable: false },
    ],
    primaryKey: ["lote"],
    detailTables: [
      { table: "backups", abr: "B", fields: ["lote"] },
    ],
    sortColumns: [{ column: "lote", order: -1 }],
    sql: {
      fields: {
        cant: {
          expr: "coalesce(nullif((select count(*) from backups where backups.lote = lotes.lote),0), (select count(*) from backups where backups.lote = lotes.lote))",
        },
      },
    },
  };
}
