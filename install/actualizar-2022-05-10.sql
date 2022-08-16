set search_path=ggs_backups;
set role per_cen_owner;

alter table externos add column deshabilitado boolean;
update externos set deshabilitado = desabilitado::boolean;
alter table externos drop column desabilitado; 

alter table externos add column creado text;
alter table externos add column modificado text;