set search_path=ggs_backups;
set role per_cen_owner;

alter table "externos"
drop column createdat,
drop column lote_indec,
drop column updatedat,
drop column createdby;