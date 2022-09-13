"use strict";

import { TableDefinition, TableContext } from "./types-ggs_backups";

export function usuarios(context: TableContext): TableDefinition {
  var { isAdmin } = context;
  return {
    name: "usuarios",
    elementName: "usuario",
    editable: isAdmin,
    fields: [
      { name: "usuario", typeName: "text", nullable: false },
      { name: "idper", typeName: "text" },
      { name: "rol", typeName: "text" },
      { name: "md5clave", typeName: "text", allow: { select: context.forDump },},
      { name: "activo", typeName: "boolean", nullable: false, defaultValue: true, editable: isAdmin,},
      { name: "nombre", typeName: "text" },
      { name: "apellido", typeName: "text" },
      { name: "dni", typeName: "text", editable: isAdmin },
      { name: "telefono", typeName: "text", title: "teléfono" },
      { name: "interno", typeName: "text" },
      { name: "mail", typeName: "text" },
      { name: "mail_alternativo", typeName: "text" },
      { name: "clave_nueva", typeName: "text", clientSide: "newPass", allow: { select: isAdmin, update: true, insert: false },},
      { name: "comuna", typeName: "integer", editable: isAdmin },
    ],
    primaryKey: ["usuario"],
    foreignKeys: [
    //   { references: "personal", fields: ["dni"] },
    //   { references: "comunas", fields: ["comuna"] },
    ],
    constraints: [{ constraintType: "unique", fields: ["dni"] }],
    // detailTables: [{ table: "personal", fields: ["dni"], abr: "P" }],
    sql: {
      where:
        isAdmin || context.forDump
          ? "true"
          : "usuario = " + context.be.db.quoteNullable(context.user.usuario),
    },
  };
}
