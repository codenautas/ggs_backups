-- set role per_cen_owner;
set role per_cen_owner;
set search_path=ggs_backups;

DROP TRIGGER personal_permisos_trg ON ggs_backups.personal;

ALTER TABLE personal ADD COLUMN estado text;
ALTER TABLE personal ADD COLUMN especificacion_estado text;


create table "estado_personal" (
  "estado" text, 
  "descripcion" text, 
  "predeterminado" boolean, 
  "exp_parcial" boolean, 
  "exp_total" boolean
, primary key ("estado")
);
grant select, insert, update, delete on "estado_personal" to per_cen_admin;
grant all on "estado_personal" to per_cen_owner;
alter table "estado_personal" add constraint "estado<>''" check ("estado"<>'');
alter table "estado_personal" add constraint "descripcion<>''" check ("descripcion"<>'');
alter table "estado_personal" add constraint "unico estado predeterminado" unique ("predeterminado");
alter table "estado_personal" add constraint "solo marcar una predeterminado si" check (predeterminado is not false);

insert into "estado_personal" ("estado", "predeterminado", "exp_parcial", "exp_total", "descripcion") values
('SELECCIONADO', 'true', 'true', 'true', 'seleccionado por RRHH; está por iniciarse el proceso, el JD no se contactó aún'),
('CONFIRMADO', null, 'true', 'true', 'persona que fue seleccionada por RRHH, fue contactada por el JD, confirmó que va a trabar. Debería darse de alta en el sistema de INDEC'),
('BAJA', null, 'true', 'true', 'debe especificar la razón, si no pudo ser contactado por varios intentos, si rechazó'),
('REUBICAR', null, null, null, 'fue contactado, aceptó el trabajo, pero no se necesita en la comuna en la que estaba anotado, debe asignarse a otra columna'),
('POSTULADO', null, null, null, 'Propuesta que debe ser enviado a RRHH para su selección');


UPDATE personal SET estado = case when baja then 'BAJA' else 'SELECCIONADO' end;
alter table "personal" alter column "estado" set not null;

alter table "personal" add constraint "estado<>''" check ("estado"<>'');
alter table "personal" add constraint "especificacion_estado<>''" check ("especificacion_estado"<>'');
alter table "personal" add constraint "personal estado_personal REL" foreign key ("estado") references "estado_personal" ("estado")  on update cascade;
create index "estado 4 personal IDX" ON "personal" ("estado");

select enance_table('estado_personal','estado');

CREATE TRIGGER personal_permisos_trg
    BEFORE INSERT OR DELETE OR UPDATE 
    ON ggs_backups.personal
    FOR EACH ROW
    EXECUTE PROCEDURE ggs_backups.personal_permisos_trg();
