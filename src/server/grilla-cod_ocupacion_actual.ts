"use strict";

import { cod_base } from "./grilla-cod_base";
import { TableDefinition } from "./types-ggs_backups";

export function cod_ocupacion_actual(): TableDefinition {
    let def = cod_base(
        ['dem06', 'dem07', 'wrk02', 'wrk04_3601', 'wrk04_3602', 'wrk06', 'wrk07', 'wrk09', 'wrk10', 'wrk11', 'wrk12', 'wrk14', 'wrk17', 'wrk18', 'wrk22', 'wrk23'], 
        ['cno_ocup_actual', 'ciuo_ocup_actual']
    );
    def.title += ' ocupación actual'
    return def
}
