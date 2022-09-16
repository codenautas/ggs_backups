"use strict";

import { changing } from "best-globals";
import { backups } from "./table-backups";
import { TableDefinition } from "./types-ggs_backups";

export function grilla_match_id(): TableDefinition {
    let def = backups();
    const tem_hogar_fields = [
        //campos base.tem_hogar
        {name:'idblaise'   ,  typeName: 'integer',  editable: false },
        {name:'operativo'  ,  typeName: 'text',     editable: false },
        {name:'enc'        ,  typeName: 'text',     editable: false },
        {name:'hogar'      ,  typeName: 'integer',  editable: false },
        //campos base.personas
         {name:'nombre'    ,  typeName: 'text'   ,  editable: false },
         {name:'edad'      ,  typeName: 'bigint' ,  editable: false },
         {name:'sexo'      ,  typeName: 'bigint' ,  editable: false },
         {name:'nacms'     ,  typeName: 'text'   ,  editable: false }
         //agregar campos espejo de los de personas : age,dem01,asex,dobm,doby
         //podriamos agregar una variable construida con la comparacion de estos campos como en la grilla del censo
         //agregar resultado de la tem?
         //agregar como detalle el registro de personas y/hogar/tem
    ]
    //@ts-ignore
    def.fields=[...tem_hogar_fields, ...def.fields]
    def.sql = changing(def.sql||{}, 
        {
            isTable:false,
            from:`(select th.*,
                p.nombre, p.edad, p.sexo, p.nacms, 
                b.*
                from backups b 
                join base.tem_hogar th on (b.respid = th.idblaise)
                left join base.personas p on (p.operativo = th.operativo AND p.vivienda = th.enc AND p.hogar = th.hogar AND th.idblaise = p.id_blaise::integer)
                left join backups a on b.respid=a.respid and a.lote <>b.lote and a.verificado_procesamiento
                where b.verificado_procesamiento 
                or (b.lote = (select max(lote) from lotes)) and
                    a.respid is null)`,
            insertIfNotUpdate:false
        })
  return def;
}