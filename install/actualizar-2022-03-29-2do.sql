set search_path=ggs_backups;
set role per_cen_owner;

create table "externos" (
  "lote" integer, 
  "orden" integer, 
  "dni" text, 
  "lote_indec" integer, 
  "apellido" text, 
  "nombre" text, 
  "puesto" text, 
  "puesto_indec" text, 
  "nombre_puesto_indec" text, 
  "enviado" boolean, 
  "cargado" boolean, 
  "ini_cap" boolean, 
  "fin_cap" boolean, 
  "rec_taller" boolean, 
  "observaciones" text, 
  "estado" text, 
  "provincia" integer default 2, 
  "provincia_indec" text, 
  "comuna" integer, 
  "fraccion" integer, 
  "radio" integer, 
  "segmento" integer, 
  "nivel_educativo" text, 
  "mail" text, 
  "telefono" text, 
  "sede" text, 
  "reparticion" text, 
  "referido" text, 
  "completo_perfil" text, 
  "desabilitado" text, 
  "createdat" text, 
  "updatedat" text, 
  "createdby" text, 
  "capacitacion" text, 
  "user_cellphone" text, 
  "user_phone" text, 
  "dni_postulo" text, 
  "nombre_postulo" text, 
  "apellido_postulo" text, 
  "rol_postulo" text
, primary key ("lote", "orden")
);
grant select, insert, update, delete on "externos" to per_cen_admin;
grant all on "externos" to per_cen_owner;

alter table "externos" add constraint "dni<>''" check ("dni"<>'');
alter table "externos" add constraint "apellido<>''" check ("apellido"<>'');
alter table "externos" add constraint "nombre<>''" check ("nombre"<>'');
alter table "externos" add constraint "puesto<>''" check ("puesto"<>'');
alter table "externos" add constraint "puesto_indec<>''" check ("puesto_indec"<>'');
alter table "externos" add constraint "nombre_puesto_indec<>''" check ("nombre_puesto_indec"<>'');
alter table "externos" add constraint "observaciones<>''" check ("observaciones"<>'');
alter table "externos" add constraint "estado<>''" check ("estado"<>'');
alter table "externos" add constraint "provincia_indec<>''" check ("provincia_indec"<>'');
alter table "externos" add constraint "nivel_educativo<>''" check ("nivel_educativo"<>'');
alter table "externos" add constraint "mail<>''" check ("mail"<>'');
alter table "externos" add constraint "telefono<>''" check ("telefono"<>'');
alter table "externos" add constraint "sede<>''" check ("sede"<>'');
alter table "externos" add constraint "reparticion<>''" check ("reparticion"<>'');
alter table "externos" add constraint "referido<>''" check ("referido"<>'');
alter table "externos" add constraint "completo_perfil<>''" check ("completo_perfil"<>'');
alter table "externos" add constraint "desabilitado<>''" check ("desabilitado"<>'');
alter table "externos" add constraint "createdat<>''" check ("createdat"<>'');
alter table "externos" add constraint "updatedat<>''" check ("updatedat"<>'');
alter table "externos" add constraint "createdby<>''" check ("createdby"<>'');
alter table "externos" add constraint "capacitacion<>''" check ("capacitacion"<>'');
alter table "externos" add constraint "user_cellphone<>''" check ("user_cellphone"<>'');
alter table "externos" add constraint "user_phone<>''" check ("user_phone"<>'');
alter table "externos" add constraint "dni_postulo<>''" check ("dni_postulo"<>'');
alter table "externos" add constraint "nombre_postulo<>''" check ("nombre_postulo"<>'');
alter table "externos" add constraint "apellido_postulo<>''" check ("apellido_postulo"<>'');
alter table "externos" add constraint "rol_postulo<>''" check ("rol_postulo"<>'');
alter table "externos" add constraint "Jerarquía de codigos geográficos inválida" check (not ((
                    (provincia is null)::text||(comuna is null)::text||(fraccion is null)::text||(radio is null)::text||(segmento is null)::text
                ) ~ 'truefalse'));

alter table "externos" add constraint "externos provincias REL" foreign key ("provincia") references "provincias" ("provincia")  on update cascade;
alter table "externos" add constraint "externos comunas REL" foreign key ("provincia", "comuna") references "comunas" ("provincia", "comuna")  on update cascade;
alter table "externos" add constraint "externos fracciones REL" foreign key ("provincia", "comuna", "fraccion") references "fracciones" ("provincia", "comuna", "fraccion")  on update cascade;
alter table "externos" add constraint "externos radios REL" foreign key ("provincia", "comuna", "fraccion", "radio") references "radios" ("provincia", "comuna", "fraccion", "radio")  on update cascade;
alter table "externos" add constraint "externos puestos REL" foreign key ("puesto") references "puestos" ("puesto")  on update cascade;
alter table "externos" add constraint "externos lotes REL" foreign key ("lote") references "lotes" ("lote")  on update cascade;
alter table "externos" add constraint "externos sedes REL" foreign key ("sede") references "sedes" ("sede")  on update cascade;
alter table "externos" add constraint "externos estado_personal REL" foreign key ("estado") references "estado_personal" ("estado")  on update cascade;

create index "provincia 4 externos IDX" ON "externos" ("provincia");
create index "provincia,comuna 4 externos IDX" ON "externos" ("provincia", "comuna");
create index "provincia,comuna,fraccion 4 externos IDX" ON "externos" ("provincia", "comuna", "fraccion");
create index "provincia,comuna,fraccion,radio 4 externos IDX" ON "externos" ("provincia", "comuna", "fraccion", "radio");
create index "puesto 4 externos IDX" ON "externos" ("puesto");
create index "lote 4 externos IDX" ON "externos" ("lote");
create index "sede 4 externos IDX" ON "externos" ("sede");
create index "estado 4 externos IDX" ON "externos" ("estado");