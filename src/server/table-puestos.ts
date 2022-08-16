"use strict";

import { TableDefinition, TableContext } from "./types-ggs_backups";

export function puestos(context: TableContext): TableDefinition {
  var { isAdmin } = context;
  return {
    name: "puestos",
    elementName: "puesto",
    editable: isAdmin,
    fields: [
      { name: "puesto", typeName: "text" },
      { name: "descripcion", typeName: "text" },
      { name: "nombre_normalizado", typeName: "text" },
      { name: "tiene_usuario", typeName: "boolean" },
      { name: "edita_personal", typeName: "boolean" },
      { name: "depende_de", typeName: "text" },
      {
        name: "desagregacion_geografica",
        typeName: "text",
        options: ["provincia", "comuna", "fraccion", "radio"],
      },
      { name: "equipo", typeName: "text" },
      { name: "jefe", typeName: "boolean" },
    ],
    primaryKey: ["puesto"],
    foreignKeys: [
      {
        references: "puestos",
        fields: [{ source: "depende_de", target: "puesto" }],
        alias: "pu",
        displayFields: ["jefe", "equipo"],
      },
      { references: "equipos", fields: ["equipo"] },
    ],
    constraints: [
      {
        constraintType: "unique",
        fields: ["jefe", "equipo", "desagregacion_geografica"],
      },
    ],
    detailTables: [
      { table: "personal", abr: "P", label: "personal", fields: ["puesto"] },
    ],
  };
}
