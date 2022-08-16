set search_path=ggs_backups;
set role per_cen_owner;

ALTER TABLE personal
    ADD COLUMN baja boolean;