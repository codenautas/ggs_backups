"use strict";

import { TableDefinition, TableContext } from "./types-ggs_backups";

export function sinrec(context: TableContext): TableDefinition {
  var { isAdmin } = context;
  return {
    name: "sinrec",
    elementName: "sinrec",
    editable: isAdmin,
    importCuidado: false,
    fields: [
      { name: "id", typeName: "integer" },
      { name: "tanda_pago", typeName: "text" },
      { name: "nombre_rol", typeName: "text" },
      { name: "nombre", typeName: "text" },
      { name: "apellido", typeName: "text" },
      { name: "documento", typeName: "text" },
      { name: "detalle_ug", typeName: "text" },
      { name: "ug", typeName: "text" },
      { name: "depto", typeName: "text" },
      { name: "frac", typeName: "text" },
      { name: "rad", typeName: "text" },
      { name: "seg", typeName: "text" },
      { name: "prov", typeName: "text" },
      { name: "provincia", typeName: "text" },
      { name: "user_email", typeName: "text" },
      { name: "perfil_completo", typeName: "text" },
      { name: "cuit", typeName: "text" },
      { name: "createdat", typeName: "text" },
      { name: "updatedat", typeName: "text" },
      { name: "user_alias", typeName: "text" },
      { name: "user_cbu", typeName: "text" },
      { name: "telefono_celular", typeName: "text" },
      { name: "refuerzo_capacitacion", typeName: "text" },
      { name: "tarea_realizada", typeName: "text" },
      { name: "prevalidacion_indec", typeName: "text" },
      { name: "importe", typeName: "text" },
      { name: "posee_cbu", typeName: "text" },
      { name: "validacion_dpe", typeName: "text" },
      {
        name: "observaciones",
        typeName: "text",
        title: "observaciones en caso de no validación",
      },
    ],
    primaryKey: ["id"],
    // constraints:[
    //     {constraintType:'unique', fields:['sinrec']},
    //     {constraintType:'unique', fields:['provincia','departamento']},
    // ],
    // foreignKeys:[
    //     {references:'provincias', fields:['provincia']},
    // ],
    // detailTables:[
    //     {table:'fracciones' , abr:'F', fields:['provincia', 'sinrec']},
    //     {table:'radios'     , abr:'R', fields:['provincia', 'sinrec']},
    //     {table:'sedes'      , abr:'L', fields:['provincia', 'sinrec']},
    //     {table:'personal'   , abr:'P', fields:['provincia', 'sinrec']},
    // ],
  };
}
