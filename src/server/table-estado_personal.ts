"use strict";

import { TableDefinition, TableContext } from "./types-ggs_backups";

export function estado_personal(context: TableContext): TableDefinition {
  var { isAdmin } = context;
  return {
    name: "estado_personal",
    elementName: "estado",
    title: "estados",
    editable: isAdmin,
    fields: [
      { name: "estado", typeName: "text" },
      { name: "descripcion", typeName: "text", title: "descripción" },
      {
        name: "predeterminado",
        typeName: "boolean",
        description: "si es el estado predeterminado al insertar personal",
      },
      {
        name: "exp_parcial",
        typeName: "boolean",
        description: "si está incluido en las exportaciones parciales",
      },
      {
        name: "exp_total",
        typeName: "boolean",
        description: "si está incluido en las exportaciones totales",
      },
    ],
    primaryKey: ["estado"],
    detailTables: [{ table: "personal", abr: "P", fields: ["estado"] }],
    constraints: [
      {
        constraintType: "unique",
        fields: ["predeterminado"],
        consName: "unico estado predeterminado",
      },
      {
        constraintType: "check",
        expr: "predeterminado is not false",
        consName: "solo marcar una predeterminado si",
      },
    ],
    sql: {},
  };
}
