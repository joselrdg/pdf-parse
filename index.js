// ('./pdfs/341g03-es.pdf');
const fs = require('fs');
const pdf = require('pdf-parse');
// const url = './pdfs/341g03-es.pdf'
const arrayUrlS = []
const arrData = []

// // grupo1
const numeroPdfs = 42;
// // grupo2
// const numeroPdfs = 52;
// // grupo3
// const numeroPdfs = 34;
// // grupo4 = 0
// // grupo5
// const numeroPdfs = 40;
// // grupo6
// const numeroPdfs = 69;
// // grupo7
// const numeroPdfs = 34;
// // grupo8
// const numeroPdfs = 22;
// // grupo9
// const numeroPdfs = 26;
// // grupo10
// const numeroPdfs = 13;

const nombPdf = []

for (let i = 0; i < numeroPdfs; i++) {
    const name = `./pdfs/grupo1/${i}.pdf`
    nombPdf.push(name)
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


console.log(nombPdf)

let contador = 0


const contadorFun = () => {
    if (contador < numeroPdfs) {
        resolveAfter(nombPdf[contador])
    } else {
        console.log(arrData)
        return console.log('Tarea terminada totalmente')
    }
}

async function resolveAfter(url) {

    let dataBuffer = fs.readFileSync(url);

    pdf(dataBuffer).then(function (data) {
        let arrText = []
        const arrParse = data.text.split(/\n \n{1,}/)
        arrParse.forEach((element, i) => {
            element = element.replace(/\n/g, ' ')
            if (!(/fci|FCI/g).test(arrParse[i])) {
                if (!((/^TRADUCCI|^Traducci/)).test(element)) {
                    arrText.push(element)
                }
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
            element = element.replace(/^ |^  /, '')
            if (!(/^[0-9]/).test(element)) {
                element = element.replace(/ {1,}$/, '')
                arrText3.push(element)

            }
        });

        let arrText4 = []
        arrText3.forEach((e => {
            if (!(/^[0-9]/).test(e) && e.length > 2) {
                arrText4.push(e)
            }
        }))

        let dataObj = {}

        if ((/[()]/).test(arrText4[0])) {
            let arr1 = arrText4[0].replace(')', '')
            let arr = arr1.split('(')
            dataObj.name = arr
        } else {
            dataObj.name = arrText4[0]
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
        arrText4.forEach((element, i) => {
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
        // dataObj.text = arrText4
        arrData.push(dataObj)
        console.log('trabajo hecho')
        contador++
        contadorFun()
    });
}

// resolveAfter('./pdfs/grupo1/41.pdf')
contadorFun()

// for (urls in arrayUrlS) {
//    const data = await resolveAfter(arrayUrlS[urls])
//    arrData.push(data)
//     console.log('trabajo hecho')
// }

