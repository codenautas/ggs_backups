"use strict";

import { TableDefinition, TableContext } from "./types-ggs_backups";

export function listado_final(context: TableContext): TableDefinition {
  var { isAdmin } = context;
  return {
    name: "listado_final",
    elementName: "listado_final",
    editable: isAdmin,
    importCuidado: false,
    fields: [
      { name: "id", typeName: "integer" },
      { name: "nombre_rol", typeName: "text" },
      { name: "nombre", typeName: "text" },
      { name: "apellido", typeName: "text" },
      { name: "documento", typeName: "text" },
      { name: "provincia", typeName: "text" },
      { name: "user_alias", typeName: "text" },
      { name: "user_cbu", typeName: "text" },
      { name: "importe", typeName: "text" },
      { name: "cuit", typeName: "text" },

      // {name:'comuna'          ,typeName:'text', inTable: false     },
      { name: "depto", typeName: "text" },
      { name: "prevalidacion_externo", typeName: "text" },
      { name: "validacion_dpe", typeName: "text" },
    ],
    primaryKey: ["id"],
    // constraints:[
    //     {constraintType:'unique', fields:['listado_final']},
    //     {constraintType:'unique', fields:['provincia','departamento']},
    // ],
    // foreignKeys:[
    //     {references:'provincias', fields:['provincia']},
    // ],
    // detailTables:[
    //     {table:'fracciones' , abr:'F', fields:['provincia', 'listado_final']},
    //     {table:'radios'     , abr:'R', fields:['provincia', 'listado_final']},
    //     {table:'sedes'      , abr:'L', fields:['provincia', 'listado_final']},
    //     {table:'personal'   , abr:'P', fields:['provincia', 'listado_final']},
    // ],
  };
}
