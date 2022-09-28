"use strict";

import { cod_base } from "./grilla-cod_base";
import { TableDefinition } from "./types-ggs_backups";

export function cod_ocupacion_actual(): TableDefinition {
    let def = cod_base(['dem06', 'dem07', 'wrk17', {name:'cno_ocup_actual', editable: true}, {name:'ciuo_ocup_actual', editable: true},  'wrk04_3601', 'wrk04_3602', 'wrk02', 'wrk06', 'wrk07', 'wrk09', 'wrk10', 'wrk11', 'wrk12', 'wrk14', 'wrk18', 'wrk22', 'wrk23'],[]);
    def.title += ' ocupación actual'
    return def
}
