// ('./pdfs/341g03-es.pdf');
const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('./pdfs/341g03-es.pdf');

// PDF.getValue({"type":"image"});
const dataPro = {
    name: '',
    origen: '',
    utilizacion: '',
    clasificacionfci: '',
    resumenhistorico: '',
    aparienciageneral: '',
    proporciones: '',
    temperamento: '',
    cabeza: '',
    trufa: '',
    dientes: '',
    ojos: '',
    orejas: '',
    cuello: '',
    cuerpo: '',
    lineasuperior: '',
    pecho: '',
    costillas: '',
    cola: '',
    extremidades: '',
    miembrosanteriores: '',
    miembrosposteriores: '',
    corvejon: '',
    piesposteriores: '',

}
pdf(dataBuffer).then(function (data) {
    let arrText = []
    const arrParse = data.text.split(/\n \n{1,}/)
    arrParse.forEach((element, i) => {
        let p = element
            .replace(/(_{3,} | {10,}|\n)/g, '')
            .replace(/(_{3,} | {10,}|\n)/g, '')
            .replace((/^ | $/), '')
            .replace(/ $/, '')
        if (p !== '') { arrText.push(p) }
    });
    const arrText2 = []
    const position = []
    let key = false
    arrText.forEach((element, i) => {
        const reg = [A - Z]
        if (reg.test(element[2])) {
            position.push(i)
        }

        let p = element.split(/[A-Z]: /)
        arrText2.push(p)
    });
    // let cont1 = []
    // arrText2.forEach((e, i) => {
    //     if (arrText2[i].length === 1) {
    //         cont1.push(i)
    //     }
    // })
    // const arrText3 = []
    // cont1.forEach((e, i) => {
    //     arrText3.push(arrText2[cont1[i]])
    //     // if (i === cont1[i]) {
    //     //     arrText3.push(arrText2[i])
    //     //     let cont = cont1[i]
    //     //     do {
    //     //         arrText3[i].push(arrText2[cont+1])
    //     //         cont++
    //     //     }while  (cont < cont1[i + 1] && cont < arrText2.length)
    //     // }
    // })

    console.log(arrText)
});
