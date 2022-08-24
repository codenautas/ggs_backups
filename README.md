# ggs_backups

Backups para ggs

## tablas

## Levantar app

1. npm i, npm start -- --dump-db
2. correr create users (SIN CREACIÓN DB)
3. grant connect on database "ggs_db" to "ggs_backups_admin";
4. al final del archivo db-dump.sql agregarle prefijo "base." a los llamados a enance_table
5. grant select on base.tem_hogar to ggs_backups_admin;
