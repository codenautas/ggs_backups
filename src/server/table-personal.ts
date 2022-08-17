"use strict";

import { TableDefinition, TableContext } from "./types-ggs_backups";
import { strict as likeAr } from "like-ar";

var ordenes = {
  paraExportar: {
    dni: null,
    apellido: null,
    nombre: null,
    puesto: null,
    estado: null,
    comuna: null,
    provincia: null,
    departamento: null,
    fraccion: null,
    radio: null,
    segmento: null,
    mail: null,
    telefono: null,
    ini_cap: null,
    fin_cap: null,
    rec_taller: null,
  },
  estructura: {},
};

const desagregacion_geografica = {
  comuna: { dentro: null, detail: "fraccion", fields: ["comuna"] },
  fraccion: {
    dentro: "comuna",
    detail: "radio",
    fields: ["comuna", "fraccion"],
  },
  radio: {
    dentro: "fraccion",
    detail: "segmento",
    fields: ["comuna", "fraccion", "radio"],
  },
  segmento: {
    dentro: "radio",
    detail: null,
    fields: ["comuna", "fraccion", "radio", "segmento"],
  },
  null: { dentro: null, detail: null, fields: [] },
};

type DUG =
  typeof desagregacion_geografica[keyof typeof desagregacion_geografica];

const optsDefault = {
  orden: null as null | keyof typeof ordenes,
  estructura: null as null | keyof typeof desagregacion_geografica,
  name: "personal",
};

export type OptsTablaPersonal = Partial<typeof optsDefault>;

export function personal(
  context: TableContext,
  _opts?: OptsTablaPersonal
): TableDefinition {
  var { isCoach, isRecepcion, isProcesamiento } = context;
  var canEdit = isCoach || isRecepcion;
  var opts: typeof optsDefault = { ...optsDefault, ..._opts };
  var puedeUG = isCoach || canEdit;
  var dUG: DUG =
    (opts.estructura && desagregacion_geografica[opts.estructura]) ||
    desagregacion_geografica["null"];
  var q = context.be.db.quoteNullable;
  var definition: TableDefinition = {
    name: opts.name,
    elementName: "persona",
    title: "personal",
    editable: isCoach || canEdit,
    importCuidado: true,
    fields: [
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
        nullable: !context.forDump,
        transformer: "upper",
      },
      { name: "alta", typeName: "date", editable: isCoach, visible: isCoach },
      { name: "baja", typeName: "date" },
      {
        name: "provincia",
        typeName: "integer",
        editable: canEdit,
        visible: false,
        defaultDbValue: "2",
      },
      ...(isCoach && opts.estructura
        ? ([
            {
              name: "exp_parcial",
              typeName: "boolean",
              editable: false,
              clientSide: "exportarParcial",
              serverSide: true,
              inTable: false,
            },
            {
              name: "exp_total",
              typeName: "boolean",
              editable: false,
              clientSide: "exportarTotal",
              serverSide: true,
              inTable: false,
            },
          ] as TableDefinition["fields"])
        : []),
      {
        name: "departamento",
        typeName: "integer",
        editable: false,
        inTable: false,
      },
      { name: "comuna", typeName: "integer", editable: canEdit },
      {
        name: "fraccion",
        typeName: "integer",
        editable: puedeUG,
        title: "fracción",
      },
      { name: "radio", typeName: "integer", editable: puedeUG },
      { name: "segmento", typeName: "integer", editable: puedeUG },
      {
        name: "nivel_educativo",
        typeName: "text",
        editable: canEdit,
        title: "nivel educativo",
      },
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
      { name: "lote", typeName: "integer", editable: canEdit, nullable: false },
      {
        name: "contrato",
        typeName: "boolean",
        editable: isProcesamiento,
        visible: isProcesamiento,
        aggregate: "countTrue",
      },
      {
        name: "cuit",
        typeName: "text",
        editable: isProcesamiento,
        title: "CUIT",
      },
      {
        name: "pendiente_enviar",
        typeName: "boolean",
        editable: false,
        visible: false,
        inTable: false,
      },
      {
        name: "desagregacion_geografica",
        typeName: "text",
        editable: false,
        visible: false,
        inTable: false,
      },
    ],
    primaryKey: ["dni"],
    foreignKeys: [
      { references: "provincias", fields: ["provincia"] },
      { references: "comunas", fields: ["provincia", "comuna"] },
      { references: "fracciones", fields: ["provincia", "comuna", "fraccion"] },
      {
        references: "radios",
        fields: ["provincia", "comuna", "fraccion", "radio"],
      },
      { references: "puestos", fields: ["puesto"] },
      { references: "lotes", fields: ["lote"] },
      { references: "sedes", fields: ["sede"] },
      { references: "estado_personal", fields: ["estado"] },
    ],
    detailTables: [
      ...(dUG.detail
        ? [
            {
              table: "e_" + dUG.detail,
              fields: dUG.fields,
              abr: dUG.detail[0].toUpperCase(),
            },
          ]
        : []),
    ],
    constraints: [
      {
        constraintType: "check",
        consName: "Jerarquía de codigos geográficos inválida",
        expr: `not ((
                    (provincia is null)::text||(comuna is null)::text||(fraccion is null)::text||(radio is null)::text||(segmento is null)::text
                ) ~ 'truefalse')`,
      },
    ],
    sql: {
      isTable: !_opts,
      where: `(select true from usuarios left join personal per using (dni)
                        left join puestos pue using (puesto)
                        where usuario = ${q(context.username)} and
                (rol='admin' or rol='recepcion'
                    or rol='coordinador' and personal.provincia = per.provincia and
                    (pue.desagregacion_geografica = 'provincia' or personal.comuna = per.comuna and
                        (pue.desagregacion_geografica = 'comuna' or personal.fraccion = per.fraccion and 
                            (pue.desagregacion_geografica = 'fraccion' or personal.radio = per.radio)
                        )
                    )
                    ${
                      isCoach && context.user.comuna
                        ? ` or (personal.comuna = ${q(context.user.comuna)})`
                        : ``
                    }
                )
            ) ${
              opts.estructura
                ? `
                and ( 
                    (puestos.desagregacion_geografica = ${q(
                      opts.estructura
                    )} and puestos.jefe)
                    ${
                      desagregacion_geografica[opts.estructura].dentro
                        ? `
                    or (puestos.desagregacion_geografica = ${q(
                      desagregacion_geografica[opts.estructura].dentro
                    )} and puestos.jefe is not true)
                    `
                        : ``
                    }
                )
            `
                : ``
            }`,
      orderBy: ["comuna", "fraccion", "radio", "dni"],
      fields: {
        departamento: { expr: "comunas.departamento" },
        pendiente_enviar: { expr: "cargado is not true" },
        desagregacion_geografica: { expr: "puestos.desagregacion_geografica" },
        exp_parcial: {
          expr: "estado_personal.exp_parcial and cargado is not true",
        },
        exp_total: { expr: "estado_personal.exp_total" },
        //coach: {expr: ''}
      },
    },
    hiddenColumns: ["departamento"],
    clientSide: "ValidarRowPersonal",
  };
  if (opts.orden) {
    definition.fields = likeAr(ordenes[opts.orden])
      .map((_, name) => definition.fields.find((f) => f.name == name)!)
      .array();
  }
  return definition;
}

/*
export function p_exportar(context:TableContext):TableDefinition{
    return personal(context, {orden:'paraExportar'});
}
*/

export function e_comuna(context: TableContext): TableDefinition {
  return personal(context, { estructura: "comuna" });
}

export function e_fraccion(context: TableContext): TableDefinition {
  return personal(context, { estructura: "fraccion" });
}

export function e_radio(context: TableContext): TableDefinition {
  return personal(context, { estructura: "radio" });
}

export function e_segmento(context: TableContext): TableDefinition {
  return personal(context, { estructura: "segmento" });
}
