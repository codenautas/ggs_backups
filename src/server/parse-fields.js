const fs = require('fs');

try {
    const data = fs.readFileSync('src\\server\\local-fields.txt', 'utf8');
    const result = []
    //{name: 'childage_', typeName: 'text', var_orig:'childage_', editable:false, orden:450, repeat: 20},
    data.split('\r\n').forEach(line => {
        const lineObj = JSON.parse(line)
        let newLine={}
        //sort
        if (lineObj.repeat){
            for (let i = 1; i <= lineObj.repeat; i++) {
                result.push(`{name: '${lineObj.name+i}', ${lineObj.description? `description: '${lineObj.description}',`:""} typeName: 'text', /*var_orig:'${lineObj.var_orig}',*/ editable:false}`)
            }
        }else{
            result.push(`{name: '${lineObj.name}', ${lineObj.description? `description: '${lineObj.description}',`:""} typeName: 'text', /*var_orig:'${lineObj.var_orig}',*/ editable:false}`)
        }
    })
    console.log(result.join(',\r\n'))
    // result.join(',\r\n').save();
    // save result to file
} catch (err) {
  console.error(err);
}