"use strict";

import { cod_base } from "./grilla-cod_base";
import { TableDefinition } from "./types-ggs_backups";

export function cod_pareja(): TableDefinition {
    let def = cod_base(
        ['dem26', 'wrk32', 'wrk34_3601', 'wrk34_3602', 'wrk35', 'wrk36', 'wrk37', 'wrk39', 'wrk41', 'wrk43', 'wrk44'], 
        ['cno_ocup_pareja', 'ciuo_ocup_pareja']
    );
    def.title += ' pareja'
    return def
}