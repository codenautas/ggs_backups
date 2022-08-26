"use strict";

import { changing } from "best-globals";
import { backups } from "./table-backups";
import { TableDefinition } from "./types-ggs_backups";

export function grilla_match_id(): TableDefinition {
    let def = backups();
    const tem_hogar_fields = [
        //campos tem_hogar
        {name:'idblaise'   ,  typeName: 'integer',  editable: false },
        {name:'operativo'  ,  typeName: 'text',     editable: false },
        {name:'enc'        ,  typeName: 'text',     editable: false },
        {name:'hogar'      ,  typeName: 'integer',  editable: false }
    ]
    //@ts-ignore
    def.fields=[...def.fields, ...tem_hogar_fields]
    def.sql = changing(def.sql||{}, 
        {
            isTable:false,
            from:`(select th.*, b.*
                from backups b join base.tem_hogar th on (b.respid = th.idblaise)
                where b.lote = (select max(lote) from lotes))`,
            insertIfNotUpdate:false
        })
  return def;
}