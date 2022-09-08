# ggs_backups

Backups para ggs

# Cuando llega un nuevo backup

## 1) Analizamos si vienen columnas diferentes al backup anterior

1. hacemos comparación de texto de 1era fila del CSV del backup actual contra el anterior
2. si tiene las mismas columnas que el backup anterior -> ir a paso 3) "Importar Backup"
3. si agrega nuevas columnas -> ir a paso 2) "generando campos desde nuevo backup"
4. si saca columnas previas -> analizar que hacer (por ahora dejamos pendiente)

## 2) generando campos desde nuevo backup

1. Copiamos archivos de ultimo html de diseño de cuestionario en carpeta src/parsing/extraer_disenio_cuestionario
2. abrimos ultimo html de diseño de cuestionario en browser
3. corremos script extraer_variables_en_html.js en consola del browser
4. copiamos el resultado del script en local-campos-cuestionario-html.txt
5. copiamos excel de backup en carpeta src/parsing/recortar_repetidos y actualizamos referencia en parseBackup.js e ignoramos el archivo en .gitignore
6. correr script por debugger VSCode o por consola: $ node src/parsing/recortar_repetidos/parseBackup.js
7. copiar resultado a sección fields de table_backups.ts
8. sacar respid (porque lo construye con type text y va con integer)

## regenerar tables_backup

1. npm run build, npm start -- --dump-db
2. si es la primera vez
   a. correr create users (SIN CREACIÓN DB)
   b. grant connect on database "ggs_db" to "ggs_backups_admin";
   c. grant select on base.tem_hogar to ggs_backups_admin;
3. al final del archivo db-dump.sql agregarle prefijo "base." a los llamados a enance_table

## TODO, automarizar:

1. copiar resultado a sección fields de table_backups.ts
2. sacar respid (porque lo construye con type text y va con integer)
3. que no haga falta ignorar el archivo en .gitignore
4. que no haga falta actualizar al referencia al nuevo archivo csv de backup

## 3) Importar backup

1. Generar excel desde backup CSV
2. crear lote
3. desplegar detalle B del lote
4. importar archivo (tildar "saltear columnas que no existan")
5. analizar si los salteados son solamente los repetidos del \_17 al \_20 haciendo comparación de archivo ultimos_salteados.txt con el output de la importación) (reemplazar ', ' por '\n')
