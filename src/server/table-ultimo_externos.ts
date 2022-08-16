"use strict";

import { externos } from "./table-externos";
import { TableDefinition, TableContext } from "./types-ggs_backups";

export function ultimo_externos(context: TableContext): TableDefinition {
  let definition = externos(context, { alias: "ultimo_externos" });
  return definition;
}
