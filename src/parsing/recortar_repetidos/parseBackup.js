const fs = require('fs');

/**
 * Este script se utiliza para realizar el proceso descripto en README.md sección "## 2) generando campos desde nuevo backup"
 */

try {
    /**
     * parsea campos previamente tomados del html en un objeto indexado {id: {desc, orden}}
     * este objeto se va a utilizar para agregarle descripción y orden a los campos tomados del backup
     */
    const datahtml = fs.readFileSync('src\\parsing\\recortar_repetidos\\local-campos-cuestionario-html.txt', 'utf8');
    let htmlFields = {}
    datahtml.split('\r\n').forEach((line, idx) => {
        const [id, desc] = line.split('|')
        htmlFields[id.toLowerCase()] = {desc, orden:idx}
    })

    /**
     * Recorre header del archivo csv del backup para tomar los campos y crear los fields para BEPlus
     * 1. Recorta a 16 los campos repetidos de hijos, conyuges y otros miembros los cuales vienen con 20 repeticiones
     * 2. Ordena los campos del backup según diseño html (los que no encuentra van al final)
     * 3. Para cada campo agrega descripción tomandola del diseño html
     */
    const data = fs.readFileSync('src\\parsing\\recortar_repetidos\\GGP_AR_30Aug2022.csv', 'utf8');
    const headerLine = data.split('\r\n')[0]
    let result = []
    let prevFN= ''
    let repCounter =0
    let attrFromHtml=''
    let orden=null;
    let backupFieldInHtml
    let terminoRepetido = true
    headerLine.split(';').forEach(backupfieldName => {
        backupFieldInHtml = htmlFields[backupfieldName]
        attrFromHtml = ''
        if (/.*_(fulldate)?\d+$/.test(backupfieldName)){
            terminoRepetido=false
            //es un repetido
            backupFieldInHtml = htmlFields[backupfieldName.replace(/\d+$/g,'')]
            if (backupFieldInHtml?.desc){
                attrFromHtml += `description: "${backupFieldInHtml.desc} ${backupfieldName.replace(/^.+_/g,'')}",`
            }
            //si es repetido del mismo campo anterior
            if( prevFN.split('_')[0] === backupfieldName.split('_')[0]){
                repCounter++
            }else {
                terminoRepetido = true
            }
        }else{
            if (backupFieldInHtml?.desc){
                attrFromHtml += `description: "${backupFieldInHtml.desc}",`
            }
            terminoRepetido=true
        }

        if (terminoRepetido){
            if(repCounter==19){
                // terminó repetición y es 19 (20 fields iguales) entonces recortamos 4
                for (let i = 1; i <= 4; i++) {
                    result.pop() // eliminamos los últimos 4
                } 
            }
            repCounter=0
        }
        if (!backupFieldInHtml){
            attrFromHtml += `/*no está en html*/`
        }
        orden = (backupFieldInHtml?.orden +1) || 1000
        result.push({fieldString: `{name: "${backupfieldName}", ${attrFromHtml} typeName: 'text', editable:false /*ordenhtml ${orden}*/},`, orden: orden})
        prevFN=backupfieldName
    })
    result.sort((a,b)=>a.orden - b.orden)
    fs.writeFileSync('src\\parsing\\recortar_repetidos\\local-generated-fields.txt', result.map(l=>l.fieldString).join('\r\n'));
} catch (err) {
  console.error(err);
}
