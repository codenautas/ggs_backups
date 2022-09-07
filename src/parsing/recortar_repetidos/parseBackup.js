const fs = require('fs');

try {
    const datahtml = fs.readFileSync('src\\parsing\\recortar_repetidos\\local-campos-cuestionario-html.txt', 'utf8');
    // construir un arreglo indexado [id, desc] para buscar la descripción
    let htmlFields = {}
    datahtml.split('\r\n').forEach((line, idx) => {
        const [id, desc] = line.split('|')
        htmlFields[id.toLowerCase()] = {desc, orden:idx}
    })

    const data = fs.readFileSync('src\\parsing\\recortar_repetidos\\GGP_AR_30Aug2022.csv', 'utf8');
    const headerLine = data.split('\r\n')[0]
    let fieldNames = headerLine.split(';')

    let result = []
    let prevFN= ''
    let repCounter =0
    let attrFromHtml=''
    headerLine.split(';').forEach(backupfieldName => {
        let backupFieldInHtml = htmlFields[backupfieldName]
        attrFromHtml = ''
        let terminoRepetido = true
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
        let orden = (backupFieldInHtml?.orden +1) || 1000
        
        result.push({fieldString: `{name: "${backupfieldName}", ${attrFromHtml} typeName: 'text', editable:false /*ordenhtml ${orden}*/},`, orden: orden})
        prevFN=backupfieldName
    })
    result.sort((a,b)=>a.orden - b.orden)
    fs.writeFileSync('src\\parsing\\recortar_repetidos\\local-generated-fields.txt', result.map(l=>l.fieldString).join('\r\n'));
} catch (err) {
  console.error(err);
}
