set search_path=ggs_backups;
set role per_cen_owner;

ALTER table "personal" 
DROP COLUMN "baja",
ADD COLUMN "baja" date,
ADD COLUMN "alta" date,
ADD COLUMN "contrato" boolean;
