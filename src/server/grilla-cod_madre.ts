"use strict";

import { cod_base } from "./grilla-cod_base";
import { TableDefinition } from "./types-ggs_backups";

export function cod_madre(): TableDefinition {
    let def = cod_base(['gen50_3601', 'gen50_3602', 'gen51'], ['cno_madre', 'ciuo_madre']);
    def.title += ' madre'
    return def
}