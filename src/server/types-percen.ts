// import * as backendPlus from "backend-plus";

// exposes APIs from this package
export * from "backend-plus";
export * from "pg-promise-strict";

declare module "backend-plus"{
    interface Context {
        isAdmin:boolean
        isProcesamiento:boolean
        isCoach:boolean
        isRecepcion:boolean
    }
    export interface User {
        usuario:string
        rol:string
    }
    
}


export type Constructor<T> = new(...args: any[]) => T;