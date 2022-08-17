"use strict";

import * as common from "./validadores";
import * as likeAr from "like-ar";
import {html} from "js-to-html"

function validarCampo(depot: myOwn.Depot, campo:string, validador:(valor:string)=>boolean ){
    if(campo in depot.row){
        var valor = depot.row[campo]
        var valido = !valor || validador(valor);
        var control = depot.rowControls[campo] as HTMLInputElement;
        control.style.textDecoration = valido ? 'none' : 'line-through';
        control.style.color = valido ? 'black' : 'red';
    }
}

var desagregaciones={
    provincia: {comuna:false, fraccion:false, radio:false, segmento:false},
    comuna   : {comuna:true , fraccion:false, radio:false, segmento:false},
    fraccion : {comuna:true , fraccion:true , radio:false, segmento:false},
    radio    : {comuna:true , fraccion:true , radio:true , segmento:false},
    segmento : {comuna:true , fraccion:true , radio:true , segmento:true },
}

function ponerBotonExportar(depot: myOwn.Depot, fieldname:string, label:string, filtro:{fieldName:string, value:any}, sufix:string){
    var boton=html.button(label).create();
    depot.rowControls[fieldname].innerHTML="";
    depot.rowControls[fieldname].appendChild(boton);
    boton.onclick=()=>{
        boton.disabled=true;
        boton.textContent='bajando';
        var div=html.div().create();
        var detailFields = depot.def.detailTables![0].fields as {source:string, target:string}[];
        var opts={
            fixedFields:[filtro, ...detailFields.map(({source, target})=>({fieldName:target, value: depot.row[source]}))],
            tableDef:{
                name:'externo-rrhh'+detailFields.map(({source, target})=>`-${target[0]}${depot.row[source]}${sufix}`).join(''),
                hiddenColumns:['enviado','observaciones','nivel_educativo','reparticion','referido','lote','exp_parcial','exp_total']
            }
        }
        var grid = my.tableGrid(depot.def.detailTables![0].table, div, opts);
        // @ts-ignore
        grid.waitForReady().then(function(grid){
            // @ts-ignore
            my.dialogDownload(grid).catch(function(){}).then(function(){
                /*
                boton.disabled=false;
                boton.textContent='exportar';
                */
                boton.textContent='hecho';
            })
        })
    }
}


myOwn.clientSides.ValidarRowPersonal = {
    prepare: function(){},
    update: function(depot: myOwn.Depot){
        validarCampo(depot, 'cbu' , common.validarCBU );
        validarCampo(depot, 'dni' , common.validarDNI );
        validarCampo(depot, 'cuil', common.validarCUIT);
        validarCampo(depot, 'mail', common.validarMAIL);
        validarCampo(depot, 'telefono', common.validarTelefono);
        var dug = depot.row.desagregacion_geografica as keyof typeof desagregaciones;
        var d = desagregaciones[dug] ?? desagregaciones.provincia
        likeAr(d).forEach((v,dg)=>{
            var e = depot.rowControls[dg];
            if(v){
                e.setAttribute('my-mandatory','normal')
                validarCampo(depot,dg,_=>true)
            }else{
                e.removeAttribute('my-mandatory')
                validarCampo(depot,dg,(v)=>v==null)
            }
        })
    }
}

myOwn.clientSides.ValidarRowExterno = {
    prepare: function(){},
    update: function(depot: myOwn.Depot){
        validarCampo(depot, 'cbu' , common.validarCBU );
        validarCampo(depot, 'cuil', common.validarCUIT);
    }
}

myOwn.clientSides.exportarParcial = {
    prepare: function(depot: myOwn.Depot, fieldName:string){
        ponerBotonExportar(depot, fieldName, 'exp. pendiente',{fieldName:'exp_parcial', value:true},'');
    },
    update: function(){
    }
}

myOwn.clientSides.exportarTotal = {
    prepare: function(depot: myOwn.Depot, fieldName:string){
        ponerBotonExportar(depot, fieldName, 'exp. total',{fieldName:'exp_total', value:true},'-T');
    },
    update: function(){
    }
}
