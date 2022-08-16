export class DigitoVerificador<Num extends bigint|number>{
    constructor(private cast:(numbreString:string|number)=>Num, private multiplicadores:Num[], private divisor:Num, private desplazamiento?:Num){
    }
    obtenerDigito(numero:Num):Num|null{
        var digitos=numero.toString().split('');
        var i=0;
        var sumador:Num = this.cast(0);
        while(digitos.length){
            var digito = this.cast(digitos.pop()||0);
            var multiplicador = this.multiplicadores[i];
            // @ts-expect-error No debería ser error. https://github.com/microsoft/TypeScript/issues/39569
            var producto:Num = digito * multiplicador;
            // @ts-expect-error No debería ser error. https://github.com/microsoft/TypeScript/issues/39569
            sumador = sumador + producto;
            i++;
        }
        if(this.desplazamiento){
            // @ts-expect-error No debería ser error. https://github.com/microsoft/TypeScript/issues/39569
            sumador = sumador + this.desplazamiento;
        }
        // @ts-expect-error No debería ser error. https://github.com/microsoft/TypeScript/issues/39569
        var verificador:Num = sumador % this.divisor;
        if(!verificador) return this.cast(0);
        if(this.divisor-verificador>9) return null;
        // @ts-expect-error No debería ser error. https://github.com/microsoft/TypeScript/issues/39569
        return this.divisor-verificador;
    }
}

var cuitN = new DigitoVerificador(Number, [2,3,4,5,6,7,2,3,4,5], 11);

export function validarCUIT(cuit:string){
    return cuit.length == 11 && 
        cuitN.obtenerDigito(cuit.substr(0,10) as unknown as number) == Number(cuit[10]);
}

var vCBU1 = new DigitoVerificador(Number, [3,1,7,9,3,1,7],10,0);
var vCBU2 = new DigitoVerificador(Number, [3,1,7,9,3,1,7,9,3,1,7,9,3],10,0);

export function validarCBU(cbu:string){
    return cbu.length == 22 && 
        vCBU1.obtenerDigito(cbu.substr(0,7 ) as unknown as number) == Number(cbu[7]) &&
        vCBU2.obtenerDigito(cbu.substr(8,13) as unknown as number) == Number(cbu[21])
}

export function validarMAIL(mail:string){
    // https://www.w3resource.com/javascript/form/email-validation.php
    return Boolean(mail) && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)
}

export function validarDNI(dni:string|number){
    return !isNaN(dni as number) && dni > 1_000_000 && dni < 100_000_000
}

export function validarTelefono(telefono:string|number){
    var t = telefono.toString();
    return /^(((\+?54)?1[1|5]\d{8}|[23]\d{9})|[2-9]\d{7})$/.test(t.replace(/-/g,''))
}
/*
var cbu = '2850590940090418135201';

console.log('CBU', cbu.substr(0,7), vCBU1.obtenerDigito(cbu.substr(0,7) as unknown as number), cbu[7]);
console.log('CBU', cbu.substr(8,13), vCBU2.obtenerDigito(cbu.substr(8,13) as unknown as number), cbu[21]);
console.log('CBU val', cbu, validarCBU(cbu));
// */