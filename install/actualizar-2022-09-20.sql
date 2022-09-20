set role ggs2022_owner;
set search_path=backups;
alter table backups add column if not exists resul_proc integer;