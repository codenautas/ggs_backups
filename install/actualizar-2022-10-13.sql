set role ggs2022_owner;
set search_path=backups;

GRANT SELECT ON TABLE base.hogares TO ggs_backups_admin;
GRANT SELECT ON TABLE base.tareas_areas TO ggs_backups_admin;