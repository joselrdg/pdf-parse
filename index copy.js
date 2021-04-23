const fs = require('fs');
const pdf = require('pdf-parse');

// Basic Usage - Local Files
let dataBuffer = fs.readFileSync('./pdfs/341g03-es.pdf');
 
// pdf(dataBuffer).then(function(data) { 
//    //use new format
//      // number of pages
//      console.log(data.numpages);
//      // number of rendered pages
//      console.log(data.numrender);
//      // PDF info
//      console.log(data.info);
//      // PDF metadata
//      console.log(data.metadata); 
//      // PDF.js version
//      // check https://mozilla.github.io/pdf.js/getting_started/
//      console.log(data.version);
//      // PDF text
//      console.log(data.text);         
// });



// If you need another format like json, you can change page render behaviour with a callback
// default render callback
function render_page(pageData) {
    //check documents https://mozilla.github.io/pdf.js/
    let render_options = {
        //replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
        normalizeWhitespace: false,
        //do not attempt to combine same line TextItem's. The default value is `false`.
        disableCombineTextItems: false
    }
 
    return pageData.getTextContent(render_options)
    .then(function(textContent) {
        let lastY, text = '';
        for (let item of textContent.items) {
            if (lastY == item.transform[5] || !lastY){
                text += item.str;
            }  
            else{
                text += '\n' + item.str;
            }    
            lastY = item.transform[5];
        }
        return text;
    });
}
 
let options = {
    pagerender: render_page
}
 
// let dataBuffer = fs.readFileSync('http://www.fci.be/Nomenclature/Standards/341g03-es.pdf');
 
pdf(dataBuffer,options).then(function(data) {
    //use new format
     // number of pages
     console.log(data.numpages);
     // number of rendered pages
     console.log(data.numrender);
     // PDF info
     console.log(data.info);
     // PDF metadata
     console.log(data.metadata); 
     // PDF.js version
     // check https://mozilla.github.io/pdf.js/getting_started/
     console.log(data.version);
     // PDF text
     console.log(data.text); 
});

