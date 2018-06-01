var hummus = require('hummus');
var PdfReader = require('pdfreader').PdfReader;
var Rule = require('pdfreader').Rule;
var _= require('lodash');
var parser = {};

var comprobantes = [];
var currentPage = 0;
var retriveNextValue = false;

parser.parsepage = function() {
  var reader =  new PdfReader();

  reader.parseFileItems('./examples-pdf/4Facturas.pdf', function(err, item){
    if (item == null) {
      for (var comprobante in comprobantes) {
        pages = comprobantes[comprobante];
        console.log(`COMPR: ${comprobante}  FIRST: ${_.first(pages)} LAST: ${_.last(pages)}`);
        var pdfWriter = hummus.createWriter('./output/' + comprobante + '.pdf');
        pdfWriter.appendPDFPagesFromPDF('./examples-pdf/4Facturas.pdf', {
          type:hummus.eRangeTypeSpecific,specificRanges: [ [ _.first(pages), _.last(pages)  ] ]
        });
        pdfWriter.end();
      }
    } else if (!item || item.page) {
      currentPage = item.page;
    } else if (item.text) {
      if (retriveNextValue) {
        if (typeof comprobantes[item.text] === 'undefined') {
          comprobantes[item.text] = [ currentPage - 1 ];
        } else {
          comprobantes[item.text].push(currentPage - 1);

        }
      }
      retriveNextValue = RegExp("^Comp\. Nro:").test(item.text);
    }
  });


};


//var pdfReader = hummus.createReader();
//console.log(pdfReader.getPagesCount());
//var dic = pdfReader.parsePageDictionary(1);
//console.log(dic);

module.exports = parser;
