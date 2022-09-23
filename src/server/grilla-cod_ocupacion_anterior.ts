"use strict";

import { cod_base } from "./grilla-cod_base";
import { TableDefinition } from "./types-ggs_backups";

export function cod_ocupacion_anterior(): TableDefinition {
    let def = cod_base(
        ['wrk26', 'wrk27_3601', 'wrk27_3602', 'wrk28'], 
        ['cno_ocup_anterior', 'ciuo_ocup_anterior']
    );
    def.title += ' ocupación anterior'
    return def
}

