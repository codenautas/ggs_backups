-- set role per_cen_owner;
set role per_cen_owner;
set search_path=ggs_backups;

DROP TRIGGER personal_permisos_trg ON ggs_backups.personal;

create table "sedes" (
  "sede" text, 
  "nombre_sede" text, 
  "domicilio" text, 
  "provincia" integer default 2, 
  "comuna" integer, 
  "fraccion" integer, 
  "radio" integer, 
  "observaciones" text, 
  "responsables" text
, primary key ("sede")
);
grant select, insert, update, delete on "sedes" to per_cen_admin;
grant all on "sedes" to per_cen_owner;

ALTER TABLE "personal" ADD "sede" text;

alter table "sedes" add constraint "sede<>''" check ("sede"<>'');
alter table "sedes" add constraint "nombre_sede<>''" check ("nombre_sede"<>'');
alter table "sedes" add constraint "domicilio<>''" check ("domicilio"<>'');
alter table "sedes" add constraint "observaciones<>''" check ("observaciones"<>'');
alter table "sedes" add constraint "responsables<>''" check ("responsables"<>'');
alter table "personal" add constraint "sede<>''" check ("sede"<>'');
alter table "personal" add constraint "personal sedes REL" foreign key ("sede") references "sedes" ("sede")  on update cascade;
create index "sede 4 personal IDX" ON "personal" ("sede");
select enance_table('sedes','sede');

CREATE TRIGGER personal_permisos_trg
    BEFORE INSERT OR DELETE OR UPDATE 
    ON ggs_backups.personal
    FOR EACH ROW
    EXECUTE PROCEDURE ggs_backups.personal_permisos_trg();
