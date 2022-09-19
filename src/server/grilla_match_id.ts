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
        //campos base.personas intercalados con campos espejo de backups (age,dem01,asex,dobm,doby)
        //podriamos agregar una variable construida con la comparacion de estos campos como en la grilla del censo
         {name:'nombre'    ,  typeName: 'text'   ,  editable: false },
         {name:'edad'      ,  typeName: 'bigint' ,  editable: false },
         {name:'ageb'      ,  typeName: 'text'   , label:'edad backup', editable: false },
         {name:'sexo'      ,  typeName: 'bigint' ,  editable: false },
         {name:'dem01b'    ,  typeName: 'text'   ,  label:'dem01 backup', editable: false },
         {name:'asexb'     ,  typeName: 'text'   ,  label:'asex backup', editable: false },
         {name:'nacms'     ,  typeName: 'text'   ,  editable: false },
         {name:'dobmb'     ,  typeName: 'text'   ,  label:'mes backup', editable: false },
         {name:'dobyb'     ,  typeName: 'text'   ,  label:'año backup', editable: false },
        //campos base.tem
        {name:'rea'      ,  typeName: 'integer',  editable: false },
        {name:'norea'      ,  typeName: 'integer',  editable: false },
        //campos base.tareas_tem
        {name:'verif_campo'      ,  typeName: 'text',  editable: false },
    ]
    //@ts-ignore
    def.fields=[...tem_hogar_fields, ...def.fields]
    def.sql = changing(def.sql||{}, 
        {
            isTable:false,
            from:`(select th.*,
                p.nombre, p.edad, b.age ageb, p.sexo, b.dem01 dem01b, b.asex asexb, p.nacms, b.dobm dobmb, b.doby dobyb,
                t.rea, t.norea, 
                tt.verif_campo,
                b.*
                from backups b 
                join base.tem_hogar th on (b.respid = th.idblaise)
                join base.tem t on t.operativo=th.operativo and t.enc=th.enc
                left join base.personas p on (p.operativo = th.operativo AND p.vivienda = th.enc AND p.hogar = th.hogar AND th.idblaise = p.id_blaise::integer)
                left join lateral (
                    select max(tt.verificado) verif_campo from base.tareas_tem tt where tt.operativo = th.operativo AND tt.enc=th.enc and tarea in ('encu','recu') and verificado ='1'
                ) as tt on true
                left join backups otrob on b.respid=otrob.respid and otrob.lote <>b.lote and otrob.verificado_procesamiento
                where b.verificado_procesamiento 
                or (b.lote = (select max(lote) from lotes)) and
                    otrob.respid is null)`,
            insertIfNotUpdate:false
        })
  return def;
}