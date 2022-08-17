"use strict";

import { TableDefinition, TableContext } from "./types-ggs_backups";

export function externos(context: TableContext, opts?: any): TableDefinition {
  var alias2 = "externos";
  var alias = opts?.alias || "externos";
  var { isCoach, isRecepcion } = context;
  var canEdit = isCoach || isRecepcion;
  var puedeUG = isCoach || canEdit;
  var definition: TableDefinition = {
    name: alias,
    elementName: "externo",
    title: "Fuentes externas",
    tableName: "externos",
    editable: isCoach || canEdit,
    fields: [
      { name: "lote", typeName: "integer", editable: canEdit },
      {
        name: "orden",
        typeName: "integer",
        editable: canEdit,
        specialValueWhenInsert: "lineNumberWhenImported",
      },
      {
        name: "hab",
        typeName: "integer",
        inTable: false,
        description: "cantidad de habilitados por dni",
      },
      { name: "dni", typeName: "text", editable: canEdit, title: "DNI" },
      {
        name: "apellido",
        typeName: "text",
        editable: canEdit,
        transformer: "upper",
      },
      {
        name: "nombre",
        typeName: "text",
        editable: canEdit,
        transformer: "upper",
      },
      { name: "puesto", typeName: "text", editable: canEdit, title: "rol" },
      {
        name: "puesto_externo",
        typeName: "text",
        editable: canEdit,
        title: "rol externo",
      },
      {
        name: "nombre_puesto_externo",
        typeName: "text",
        editable: canEdit,
        title: "nombre rol externo",
      },
      {
        name: "enviado",
        typeName: "boolean",
        editable: isCoach,
        visible: isCoach,
        aggregate: "countTrue",
      },
      {
        name: "cargado",
        typeName: "boolean",
        editable: isCoach,
        visible: isCoach,
        aggregate: "countTrue",
      },
      {
        name: "ini_cap",
        typeName: "boolean",
        editable: isCoach,
        visible: isCoach,
        aggregate: "countTrue",
      },
      {
        name: "fin_cap",
        typeName: "boolean",
        editable: isCoach,
        visible: isCoach,
        aggregate: "countTrue",
      },
      {
        name: "rec_taller",
        typeName: "boolean",
        editable: isCoach,
        visible: isCoach,
        aggregate: "countTrue",
      },
      {
        name: "observaciones",
        typeName: "text",
        editable: isCoach,
        visible: isCoach,
      },
      {
        name: "estado",
        typeName: "text",
        editable: canEdit,
        transformer: "upper",
      },
      {
        name: "provincia",
        typeName: "integer",
        editable: canEdit,
        visible: false,
        defaultDbValue: "2",
      },
      { name: "provincia_externo", typeName: "text", editable: canEdit },
      { name: "comuna", typeName: "integer", editable: canEdit },
      { name: "departamento", typeName: "integer", editable: canEdit },
      {
        name: "fraccion",
        typeName: "integer",
        editable: puedeUG,
        title: "fracción",
      },
      { name: "radio", typeName: "integer", editable: puedeUG },
      { name: "segmento", typeName: "integer", editable: puedeUG },
      { name: "difug", typeName: "text", editable: canEdit, inTable: false },
      // {name:'nivel_educativo'  ,typeName:'text'    , editable:canEdit     ,title:'nivel educativo'  },
      { name: "mail", typeName: "text", editable: canEdit },
      {
        name: "telefono",
        typeName: "text",
        editable: canEdit,
        title: "teléfono",
      },
      {
        name: "sede",
        typeName: "text",
        editable: canEdit,
        description:
          "indicar sede cuando no sea la asignada al departamento o fracción o para los Jefes de Radio o Censistas (que vienen sin fracción/radio)",
      },
      {
        name: "reparticion",
        typeName: "text",
        editable: canEdit,
        title: "repartición",
      },
      { name: "referido", typeName: "text", editable: canEdit },
      { name: "completo_perfil", typeName: "text", editable: canEdit },
      { name: "deshabilitado", typeName: "boolean", editable: canEdit },
      { name: "creado", typeName: "text", editable: canEdit },
      { name: "modificado", typeName: "text", editable: canEdit },
      {
        name: "refuerzo",
        typeName: "text",
        editable: canEdit,
        title: "Refuerzo Capacitación	",
      },
      {
        name: "finalizada",
        typeName: "text",
        editable: canEdit,
        title: "Tarea finalizada	",
      },
      {
        name: "detalle_ug",
        typeName: "text",
        editable: canEdit,
        title: "Detalle UG",
      },
      { name: "ug", typeName: "text", editable: canEdit, title: "UG" },
      { name: "capacitacion", typeName: "text", editable: canEdit },
      { name: "user_cellphone", typeName: "text", editable: canEdit },
      { name: "user_phone", typeName: "text", editable: canEdit },
      {
        name: "dni_postulo",
        typeName: "text",
        editable: canEdit,
        title: "DNI quien postulo",
      },
      {
        name: "nombre_postulo",
        typeName: "text",
        editable: canEdit,
        title: "Nombre quien postulo",
      },
      {
        name: "apellido_postulo",
        typeName: "text",
        editable: canEdit,
        title: "Apellido quien postulo",
      },
      {
        name: "j_mail",
        typeName: "text",
        editable: canEdit,
        title: "mail de quien postulo",
      },
      {
        name: "rol_postulo",
        typeName: "text",
        editable: canEdit,
        title: "Rol quien postulo",
      },
      { name: "j_departamento", typeName: "integer", editable: false },
      {
        name: "j_fraccion",
        typeName: "integer",
        editable: false,
        title: "j fracción",
      },
      { name: "j_radio", typeName: "integer", editable: false },
      { name: "j_segmento", typeName: "integer", editable: false },
      { name: "cuit", typeName: "text", editable: canEdit, title: "CUIT" },
      {
        name: "ok_cuit",
        typeName: "boolean",
        editable: canEdit,
        title: "ok¹",
        inTable: false,
      },
      { name: "cbu", typeName: "text", editable: canEdit, title: "CBU" },
      {
        name: "ok_cbu",
        typeName: "boolean",
        editable: canEdit,
        title: "ok²",
        inTable: false,
      },
    ],
    primaryKey: ["lote", "orden"],
    foreignKeys: [{ references: "lotes", fields: ["lote"] }],
    softForeignKeys: [
      { references: "dotacion", fields: ["departamento", "fraccion"] },
    ],
    detailTables: [
      {
        table: "externos",
        fields: ["lote", { source: "dni", target: "dni_postulo" }],
        abr: "e",
        label: "personal a cargo",
      },
    ],
    sql: {
      fields: {
        difug: {
          expr: `case 
                    when coalesce(j_departamento,0) <> 0 and coalesce(j_departamento,0) <> coalesce(${alias2}.departamento,0) then 'd'
                    when coalesce(j_fraccion    ,0) <> 0 and coalesce(j_fraccion    ,0) <> coalesce(${alias2}.fraccion    ,0) then 'f'
                    else null end`,
        },
        hab: {
          expr: `count(*) filter (where ${alias2}.deshabilitado is not true) over (partition by ${alias2}.dni, ${alias2}.lote)`,
        },
        ok_cuit: {
          expr: `validar_cuit(cuit)`,
        },
        ok_cbu: {
          expr: `validar_cbu(cbu)`,
        },
      },
      from: `(
                select * 
                    from externos e
                        left join lateral (select departamento as j_departamento, fraccion as j_fraccion, radio as j_radio, segmento as j_segmento, mail as j_mail
                            from externos j 
                            where j.lote = e.lote and j.dni = e.dni_postulo and j.deshabilitado is not true
                            order by orden desc limit 1) j on true
                    where ${
                      alias == "ultimo_externos"
                        ? "e.lote = (select lote from lotes where imputado is true order by lote desc limit 1)"
                        : "true"
                    }
            )`,
    },
    hiddenColumns: [
      "puesto",
      "enviado",
      "cargado",
      "ini_cap",
      "fin_cap",
      "rec_taller",
      "observaciones",
      "estado",
      "sede",
      "reparticion",
      "referido",
      "creado",
      "modificado",
    ],
    clientSide: "ValidarRowExterno",
  };
  return definition;
}
