# ggs_backups

Personal del censo.

## tablas

**Personal**, tiene la información necesaria para saber quiénes van a participar,
en qué tareas y en qué ubicación geográfica; la información de contacto;
y una serie de campos para indicar en qué estado se encuentra.

**provincia, comuna, fracción y radio**, son las tablas geográficas. 1. **provincias**: _provincia_, nombre 2. **comunas**: _provincia_, _comuna_, comuna 3. **facciones**: _provincia_, _comuna_, _fraccion_ 4. **radio**: _provincia_, _comuna_, _fraccion_, _radio_

**puestos**, cara persona tiene un puest. La pk es puesto.
Además se agregan los campos: descripcion, tiene_usuario (bool), edita_personal (bool),
depende_de (que es un puesto o null), desagregacion_geografica (texto que puede ser:
'provincia','comuna','fraccion','radio') que indica hasta donde es obligatorio

**usuarios**, a la tabla usuarios habitual hay que agregarle el DNI para poder hacer la FK con Personal
