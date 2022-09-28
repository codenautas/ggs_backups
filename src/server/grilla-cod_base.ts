"use strict";

import { grilla_match_id } from "./grilla_match_id";
import { FieldDefinition, TableDefinition } from "./types-ggs_backups";

export function cod_base(fieldsToCheck:(string|{name:string, editable:boolean})[], fieldsToCode:string[]): TableDefinition {
    let def = grilla_match_id();
    def.title='Grilla codificación '
    const backupfieldsToShow = [
        {name:'respid'},
        {name:'lote'},
        {name:'enc'},
        {name:'rea'},
        {name:'verif_campo'},
                // tabla backups
        {name:'verificado_procesamiento', editable: false},
        {name:'resul_proc', editable: false},
        {name:'observaciones', editable: false},
                // codif
        ...fieldsToCheck.map(fieldOrfieldName=> typeof fieldOrfieldName === 'string'? {name:fieldOrfieldName}: fieldOrfieldName ),
        ...fieldsToCode.map(f=> {return {name:f, editable: true}})
    ]

    def.fields.forEach(f=>f.visible=false)
    //Ponemos cada campo a mostrar en visible=true, le pisamos el attr editable y por último lo eliminamos por idx y lo pusheamos para que quede ordenado
    backupfieldsToShow.forEach(fToShow=> {
        const fieldIdx = def.fields.findIndex(sourceField=>sourceField.name===fToShow.name)
        let sourceFieldToShow:FieldDefinition  = def.fields[fieldIdx]
        // modificamos elemento
        if('editable' in fToShow) sourceFieldToShow.editable=fToShow.editable 
        sourceFieldToShow.visible = true
        def.fields.push(sourceFieldToShow) // lo insertamos al final
        def.fields.splice(fieldIdx,1) // sacamos del arreglo
    })
    
  return def;
}