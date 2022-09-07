# ggs_backups

Backups para ggs

## tablas

## regenerar tables_backup

1. npm i, npm start -- --dump-db
2. si es la primera vez
   a. correr create users (SIN CREACIÓN DB)
   b. grant connect on database "ggs_db" to "ggs_backups_admin";
   c. grant select on base.tem_hogar to ggs_backups_admin;
3. al final del archivo db-dump.sql agregarle prefijo "base." a los llamados a enance_table

## generar campos de tabla backups en base a excel ggs_ar_blaise_var_220729_provisorio

1. copio todo el contenido del excel en un archivo de texto y lo guardo como "local-fields.txt"
2. reemplazo tabs por ;;
3. aplico reemplazo en vscode con regex
   match: (.+);;(.+);;(.+);;(.+);;(.\*);;(.+)
   replace: {"name": "$1", var_orig:"$2", "description": "$3", "orden":$4, "repeat": $5}
4. armo a mano variable "instrument"
5. limpio las descripciones y repeat vacios
   repeats: , repeat: } por }
   descs: description: "", por vacio
6. corro parse-fields.js
7. copiarse resultado y sacar respid (porque lo construye con type text y va con integer)

# generando tabla backup por primera vez

1. abrimos ultimo html de diseño de cuestionario en browser
2. corremos script extraer_variables_en_html.js en consola del browser
3. copiamos el resultado del script en local-campos-cuestionario-html.txt
4. correr script parseBackup.js
