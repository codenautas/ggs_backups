"use strict";

import { backups } from "./table-backups";
import { TableDefinition } from "./types-ggs_backups";

export function grilla_match_id(): TableDefinition {
  var definition: TableDefinition = {
    name: "matchs",
    elementName: "match",
    title: "Matchs por id",
    tableName: "matchs",
    editable:false,
    fields: [
        //campos tem_hogar
        {name:'idblaise'   ,  typeName: 'integer',  editable: true, nullable: false },
        {name:'operativo'  ,  typeName: 'text',     editable: true, nullable: false },
        {name:'enc'        ,  typeName: 'text',     editable: true, nullable: false },
        {name:'hogar'      ,  typeName: 'integer',  editable: true, nullable: false },
    ],
    primaryKey: ["lote", "respid", 'idblaise'],
    foreignKeys: [{ references: "lotes", fields: ["lote"] }],
    sql:{
        isTable:false,
        from:`(select th.*, b.*
            from backups b join base.tem_hogar th on (b.respid = th.idblaise::text)
            where b.lote = (select max(lote) from lotes))`,
    }
  };
  definition.fields= [...definition.fields, ...backups().fields]
  return definition;
}