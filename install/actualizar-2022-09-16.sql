set role ggs2022_owner;
set search_path=backups;

GRANT SELECT ON TABLE base.personas TO ggs_backups_admin;

alter table "backups" add unique ("respid", "verificado_procesamiento");

ALTER TABLE IF EXISTS backups DROP CONSTRAINT IF EXISTS "verificado_procesamiento puede ser true o nulo";
ALTER TABLE backups add CONSTRAINT  "verificado_procesamiento puede ser true o nulo" check(verificado_procesamiento in (null,true));
