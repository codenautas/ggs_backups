set search_path=ggs_backups;
set role per_cen_owner;

ALTER table "personal" 
ADD COLUMN "cuit" text;

alter table "personal" add constraint "cuit<>''" check ("cuit"<>'');
