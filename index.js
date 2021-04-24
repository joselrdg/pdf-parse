// ('./pdfs/341g03-es.pdf');
const fs = require('fs');
const pdf = require('pdf-parse');
const url = './pdfs/341g03-es.pdf'
const pdfObjt = (url) => {

    let dataBuffer = fs.readFileSync(url);

    pdf(dataBuffer).then(function (data) {
        let arrText = []
        const arrParse = data.text.split(/\n \n{1,}/)
        arrParse.forEach((element, i) => {
            element = element.replace(/\n/g, ' ')
            if (!(/fci|FCI/g).test(arrParse[i])) {
                arrText.push(element)
            }
        });
        let arrText2 = [];
        arrText.forEach((element, i) => {
            if (!(/^FEDERATION/).test(arrText[i])) {
                arrText2.push(element)
            }
        });
        let arrText3 = [];
        arrText2.forEach((element, i) => {
            element = element.replace(/ {1,}/g, ' ')
            if (!(/[0-9]| /).test(arrText2[i][0])) {
                element = element.replace(/ {1,}$/, '')
                arrText3.push(element)
            }
        });

        let dataObj = {}

        if ((/[()]/).test(arrText3[0])) {
            let arr1 = arrText3[0].replace(')', '')
            let arr = arr1.split('(')
            dataObj.name = arr
        } else {
            dataObj.name = arrText3[0]
        }
        const regx = [
            (/^ORIGEN|^Origen/),
            (/^FECHA|^Fecha/),
            (/^UTILIZACI|^Utilizaci/),
            (/^BREVE|^Breve/),
            (/^APARIENCIA|^Apariencia/),
            (/^COMPORTAMIENTO|^Comportamiento/),
            (/^CABEZA|^Cabeza/),
            (/^REGION CRANEAL|^Region craneal/),
            (/^REGION FACIAL|^Region facial/),
            (/^OJOS|^Ojos/),
            (/^OREJAS|^Orejas/),
            (/^CUELLO|^Cuello/),
            (/^CUERPO|^Cuerpo/),
            (/^MIEMBROS ANTERIORES|^Miembros anteriores/),
            (/^MIEMBROS POSTERIORES|^Miembros posteriores/),
            (/^MOVIMIENTO|^Movimiento/),
            (/^PIEL|^Piel/),
            (/^PELO|^Pelo/),
            (/^COLOR|^Color/),
            (/^TAMAÑO|^Tamaño/),
            (/^FALTAS|^Faltas/),
            (/^FALTAS GRAVES|^Faltas graves/),
            (/^FALTAS DESCALIFICANTES|^Faltas descalificantes/),
        ]
        const nom = [
            'origen',
            'fecha',
            'utilizado',
            'historia',
            'apariencia',
            'comportamiento',
            'cabeza',
            'craneal',
            'facial',
            'ojos',
            'orejas',
            'cuello',
            'cuerpo',
            'eanteriores',
            'eposteriores',
            'movimiento',
            'piel',
            'pelo',
            'color',
            'tamano',
            'faltas',
            'graves',
            'descalifivantes',
        ]
        arrText3.forEach((element, i) => {
            element = element.replace(/(.)$/, '')
            regx.forEach((e, ind) => {
                if ((e).test(element)) {
                    if ((/: /g).test(element)) {
                        let arr = element.split(/: /)
                        if (arr.length === 2) {
                            dataObj[nom[ind]] = arr[1]
                        } else {
                            dataObj[nom[ind]] = arr
                        }
                    } else {
                        dataObj[nom[ind]] = element // optimizar
                    }
                }
            });
        });
        console.log(arrText3.length)
        console.log(dataObj)
    });
}

pdfObjt(url)