set search_path=ggs_backups;
set role per_cen_owner;

CREATE SEQUENCE id_sinrec_seq;
GRANT all ON SEQUENCE id_sinrec_seq TO per_cen_owner;
GRANT all ON SEQUENCE id_sinrec_seq TO per_cen_admin;

create table "sinrec" (
  "id" integer NOT NULL DEFAULT nextval('id_sinrec_seq'),
  "tanda_pago" text, 
  "nombre_rol" text, 
  "nombre" text, 
  "apellido" text, 
  "documento" text, 
  "detalle_ug" text, 
  "ug" text, 
  "depto" text, 
  "frac" text, 
  "rad" text, 
  "seg" text, 
  "prov" text, 
  "provincia" text, 
  "user_email" text, 
  "perfil_completo" text, 
  "cuit" text, 
  "createdat" text, 
  "updatedat" text, 
  "user_alias" text, 
  "user_cbu" text, 
  "telefono_celular" text, 
  "refuerzo_capacitacion" text, 
  "tarea_realizada" text, 
  "prevalidacion_indec" text, 
  "importe" text, 
  "posee_cbu" text, 
  "validacion_dpe" text, 
  "observaciones" text
, primary key ("id")
);
grant select, insert, update, delete on "sinrec" to per_cen_admin;
grant all on "sinrec" to per_cen_owner;

--------------------------

CREATE SEQUENCE id_listado_seq;
GRANT all ON SEQUENCE id_listado_seq TO per_cen_owner;
GRANT all ON SEQUENCE id_listado_seq TO per_cen_admin;

create table "listado_final" (
  "id" integer NOT NULL DEFAULT nextval('id_listado_seq'),
  "nombre_rol" text, 
  "nombre" text, 
  "apellido" text, 
  "documento" text, 
  "provincia" text, 
  "user_alias" text, 
  "user_cbu" text, 
  "importe" text, 
  "cuit" text, 
  "depto" text, 
  "prevalidacion_indec" text, 
  "validacion_dpe" text
, primary key ("id")
);
grant select, insert, update, delete on "listado_final" to per_cen_admin;
grant all on "listado_final" to per_cen_owner;
