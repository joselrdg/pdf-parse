// ('./pdfs/341g03-es.pdf');
const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('./pdfs/341g03-es.pdf');

// PDF.getValue({"type":"image"});

pdf(dataBuffer).then(function (data) {
    let pdf = {}
    // console.log(data);
    console.log(data.text.length);
    let star = 0
    let arrParse = data.text.split(/\n \n{1,}/)
    console.log(arrParse)

});
