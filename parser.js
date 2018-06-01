var PdfReader = require('pdfreader').PdfReader;
var _= require('lodash');
var generator = require('./generator.js');
var parser = {};

var comprobantes = [];
var currentPage = 0;
var retriveNextValue = false;

parser.parsepage = function(filename, output, regex) {
  var reader =  new PdfReader();

  reader.parseFileItems(filename, function(err, item){
    if (item == null) {
      generator.generateFiles(comprobantes,filename, output);
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
      retriveNextValue = RegExp("^" + regex).test(item.text);
    }
  });

};

module.exports = parser;
