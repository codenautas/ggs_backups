export const staticConfigYaml = `
server:
  port: 3021
  session-store: memory-saved
db:
  motor: postgresql
  host: localhost
  database: ggs_backups_db
  schema: ggs_backups
  user: per_cen_admin
data:
  transformers:
    text: normal
login:
  table: usuarios
  userFieldName: usuario
  passFieldName: md5clave
  rolFieldName: rol
  infoFieldList: [usuario, rol, dni, comuna]
  activeClausule: activo
  unloggedLandPage: false
  plus:
    allowHttpLogin: true
    fileStore: true
    loginForm:
      formTitle: entrada
      formImg: img/login-lock-icon.png
client-setup:
  menu: true
  lang: es
  user-scalable: no
install:
  dump:
    db:
      owner: per_cen_owner
    enances: inline
    scripts:
      post-adapt:
      - ../node_modules/pg-triggers/lib/recreate-his.sql
      - ../node_modules/pg-triggers/lib/table-changes.sql
      - ../node_modules/pg-triggers/lib/function-changes-trg.sql
      - ../node_modules/pg-triggers/lib/enance.sql
      - personal_permisos_trg.sql      
logo: 
  path: client/img
`;
