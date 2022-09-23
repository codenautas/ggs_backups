set role ggs2022_owner;
set search_path=backups;

alter table backups
add column if not exists "cno_padre" integer, 
add column if not exists "ciuo_padre" integer, 
add column if not exists "cno_madre" integer, 
add column if not exists "ciuo_madre" integer, 
add column if not exists "cno_ocup_actual" integer, 
add column if not exists "ciuo_ocup_actual" integer, 
add column if not exists "cno_ocup_anterior" integer, 
add column if not exists "ciuo_ocup_anterior" integer, 
add column if not exists "cno_ocup_pareja" integer, 
add column if not exists "ciuo_ocup_pareja" integer;