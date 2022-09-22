"use strict";

import { grilla_match_id } from "./grilla_match_id";
import { TableDefinition } from "./types-ggs_backups";

export function cod_base(FieldsToCheck:string[], fieldsToCode:string[]): TableDefinition {
    let def = grilla_match_id();
    def.title='Grilla codificación '
    const backupfieldsToShow = [
        {name:'rea'},
        {name:'norea'},
        {name:'verif_campo'},
                // tabla backups
        {name:'verificado_procesamiento', editable: false},
        {name:'observaciones', editable: false},
        {name:'resul_proc', editable: false},
        {name:'respid'},
        {name:'lote'},
                // codif
        ...FieldsToCheck.map(f=> {return {name:f}}),
        ...fieldsToCode.map(f=> {return {name:f, editable: true}})
    ]

    const newFields = backupfieldsToShow.map(fToShow=> {
        let sourceFieldToShow = def.fields.find(sourceField=>sourceField.name===fToShow.name)
        if('editable' in fToShow) sourceFieldToShow!.editable=fToShow.editable 
        return sourceFieldToShow
    })

    //@ts-ignore
    def.fields=newFields
  return def;
}