"use strict";

// import * as Path from 'path';
import {
  AppBackend,
  ExpressPlus,
  Context,
  Request,
  ClientModuleDefinition,
  OptsClientPage,
  MenuDefinition,
  MenuInfoBase,
} from "backend-plus";
import * as MiniTools from "mini-tools";

// import {changing} from 'best-globals';

import { Proceduresggs_backups } from "./procedures-ggs_backups";

import { usuarios } from "./table-usuarios";
import { lotes } from "./table-lotes";
import { estado_personal } from "./table-estado_personal";
import { sinrec } from "./table-sinrec";
import { listado_final } from "./table-listado_final";
import { sedes } from "./table-sedes";
import {
  personal,
  e_comuna,
  e_fraccion,
  e_radio,
  e_segmento,
} from "./table-personal";
import { backups } from "./table-backups";
import { externos_personal } from "./table-externos_personal";
import { ultimo_externos } from "./table-ultimo_externos";
import { ultimo_externos_personal } from "./table-externos_personal";
import { provincias } from "./table-provincias";
import { comunas } from "./table-comunas";
import { fracciones } from "./table-fracciones";
import { radios } from "./table-radios";
import { dotacion } from "./table-dotacion";
import { equipos } from "./table-equipos";
import { puestos } from "./table-puestos";
import { match_puestos } from "./table-match_puestos";
import {
  ultimo_control_estructura,
  control_estructura,
  control_estructura_d,
  control_estructura_f,
  control_estructura_r,
  control_estructura_s,
} from "./table-control_estructura";

import { staticConfigYaml } from "./def-config";
import { ContextForDump } from "backend-plus";

//function json(sql:string, orderby:string){
//    return `COALESCE((SELECT jsonb_agg(to_jsonb(j.*) ORDER BY ${orderby}) from (${sql}) as j),'[]'::jsonb)`
//}

export class Appggs_backups extends AppBackend {
  constructor() {
    super();
  }
  async postConfig() {
    await super.postConfig();
  }
  configStaticConfig() {
    super.configStaticConfig();
    this.setStaticConfig(staticConfigYaml);
  }
  addSchrödingerServices(mainApp: ExpressPlus, baseUrl: string) {
    var be = this;
    if (baseUrl == "/") {
      baseUrl = "";
    }
    mainApp.get(baseUrl + "/pub", async function (req, res, _next) {
      // @ts-ignore useragent existe
      var { useragent } = req;
      var htmlMain = be
        .mainPage({ useragent }, false, { skipMenu: true })
        .toHtmlDoc();
      MiniTools.serveText(htmlMain, "html")(req, res);
    });
    super.addSchrödingerServices(mainApp, baseUrl);
  }
  addUnloggedServices(mainApp: ExpressPlus, baseUrl: string) {
    //var be=this;
    if (baseUrl == "/") {
      baseUrl = "";
    }
    super.addUnloggedServices(mainApp, baseUrl);
  }
  async getProcedures() {
    var be = this;
    return [...(await super.getProcedures()), ...Proceduresggs_backups].map(
      be.procedureDefCompleter,
      be
    );
  }
  
  getMenu(): MenuDefinition {
    var menuContent: MenuInfoBase[] = [];
    menuContent.push({ menuType: "table", name: "lotes" });
    menuContent.push({ menuType: "menu", name: "config", label: "configurar",
        menuContent: [ { menuType: "table", name: "usuarios" }, ],
    });
    return { menu: menuContent };
  }
  clientIncludes(
    req: Request | null,
    opts: OptsClientPage
  ): ClientModuleDefinition[] {
    var menuedResources: ClientModuleDefinition[] =
      req && opts && !opts.skipMenu
        ? [
            { type: "js", src: "validadores.js" },
            { type: "js", src: "client.js" },
          ]
        : [{ type: "js", src: "unlogged.js" }];
    return [
      ...super.clientIncludes(req, opts),
      { type: "css", file: "menu.css" },
      ...menuedResources,
    ];
  }
  prepareGetTables() {
    super.prepareGetTables();
    this.getTableDefinition = {
      ...this.getTableDefinition,
      usuarios,
      lotes,
      estado_personal,
      sedes,
      personal,
      sinrec,
      listado_final,
      externos: backups,
      externos_personal,
      ultimo_externos,
      ultimo_externos_personal,
      provincias,
      comunas,
      fracciones,
      radios,
      dotacion,
      equipos,
      puestos,
      match_puestos,
      e_comuna,
      e_fraccion,
      e_radio,
      e_segmento,
      control_estructura,
      control_estructura_d,
      control_estructura_f,
      control_estructura_r,
      control_estructura_s,
      ultimo_control_estructura,
    };
  }
}
