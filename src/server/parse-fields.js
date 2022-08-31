const fs = require('fs');

const buildLine = (line, i) => `{name: "${line.name+(i||'')}", ${line.description? `description: "${line.description}",`:""} typeName: 'text', /*var_orig:'${line.var_orig}', orden:${line.orden},*/ editable:false}`
try {
    const data = fs.readFileSync('src\\server\\local-fields.txt', 'utf8');
    const result = []
    const result2 = []
    //{name: 'childage_', typeName: 'text', var_orig:'childage_', editable:false, orden:450, repeat: 20},
    const lines = data.split('\r\n').map(l=> JSON.parse(l))
    lines.sort((a,b)=> a.orden-b.orden)
    lines.forEach(lineObj => {
        if (lineObj.repeat){
            // si tiene mas de 20 repeticiones le saco las últimas 5
            lineObj.repeat = lineObj.repeat>=20? lineObj.repeat-5 : lineObj.repeat
            for (let i = 1; i <= lineObj.repeat; i++) {
                result.push(buildLine(lineObj,i))
            }
        }else{
            result.push(buildLine(lineObj))
        }
    })
    fs.writeFileSync('src\\server\\local-generated-fields.txt', result.join(',\r\n'));
    // fs.writeFileSync('src\\server\\local-repeated-fields.txt', result2.join(',\r\n'));
} catch (err) {
  console.error(err);
}
//para parsear el html: 
//[...document.getElementsByClassName('question')].map(q=> return {name:q.id})