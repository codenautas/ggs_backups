"use strict";

import { cod_base } from "./grilla-cod_base";
import { TableDefinition } from "./types-ggs_backups";

export function cod_padre(): TableDefinition {
    let def = cod_base(['gen48_3601', 'gen48_3602', 'gen49'], ['cno_padre', 'ciuo_padre']);
    def.title += ' padre'
    return def
}