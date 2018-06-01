var hummus = require('hummus');
var _= require('lodash');
var generator = {};

generator.generateFiles = function(comprobantes, filename, output) {
    for (var comprobante in comprobantes) {
        pages = comprobantes[comprobante];
        console.log(`COMPR: ${comprobante}  FIRST: ${_.first(pages)} LAST: ${_.last(pages)}`);
        var pdfWriter = hummus.createWriter(output + '/' + comprobante + '.pdf');
        pdfWriter.appendPDFPagesFromPDF(filename, {
            type:hummus.eRangeTypeSpecific,specificRanges: [ [ _.first(pages), _.last(pages)  ] ]
        });
        pdfWriter.end();
    }

};

module.exports = generator;
