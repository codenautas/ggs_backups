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
      {
        name: "recepcion",
        typeName: "date",
        specialDefaultValue: "current_date",
      },
      { name: "remitente", typeName: "text", isName: true },
      { name: "nombre_archivo", typeName: "text" },
      { name: "observaciones", typeName: "text", isName: true },
      { name: "procesamiento", typeName: "text", editable: isProcesamiento },
      { name: "cant", typeName: "bigint", inTable: false, editable: false },
      { name: "imputado", typeName: "boolean", editable: isProcesamiento },
    ],
    primaryKey: ["lote"],
    detailTables: [
      { table: "personal", abr: "P", label: "personal", fields: ["lote"] },
      { table: "externos", abr: "E", label: "externos", fields: ["lote"] },
      {
        table: "externos_personal",
        abr: "M",
        label: "Matching personal-externos",
        fields: ["lote"],
      },
      {
        table: "control_estructura",
        abr: "C",
        label: "Control de estructura",
        fields: ["lote"],
      },
    ],
    sortColumns: [{ column: "lote", order: -1 }],
    sql: {
      fields: {
        cant: {
          expr: "coalesce(nullif((select count(*) from personal where personal.lote = lotes.lote),0), (select count(*) from externos where externos.lote = lotes.lote))",
        },
      },
    },
  };
}
