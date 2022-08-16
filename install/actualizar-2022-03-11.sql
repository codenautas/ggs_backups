set search_path=ggs_backups;
set role per_cen_owner;

ALTER table "sedes" 
ADD COLUMN "localidad" text default 'CABA',
ADD COLUMN "codigo_postal" text,
ADD COLUMN "telefono" text,
ADD COLUMN "codigo_depto" integer;

alter table "sedes" add constraint "localidad<>''" check ("localidad"<>'');
alter table "sedes" add constraint "codigo_postal<>''" check ("codigo_postal"<>'');
alter table "sedes" add constraint "telefono<>''" check ("telefono"<>'');

