const elements = document.getElementsByClassName('question');
let fields=''
for (let i = 0; i < elements.length; i++) { 
    var interior=elements[i];
    var n=interior.getElementsByClassName('Description')[0];
    var nombre= n? n.innerText:'';
    //var p=interior.getElementsByClassName('questiontext')[0];
    //var preg=p?p.innerText:'';
    var t=interior.getElementsByClassName('response')[0];
    var ti=t?t.innerText:'';
    //console.log( elements[i].id + '|'+nombre+'|'+preg);
    fields += ( elements[i].id + '|'+nombre+ '\r\n');
}
debugger