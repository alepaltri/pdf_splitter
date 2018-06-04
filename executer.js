const {ipcRenderer} = require('electron')



// var execEl = document.querySelector('.execute');
module.exports =  function() {
    console.log('entro');
    filename = document.getElementById("filename").value;
    output = document.getElementById("output").value;
    regex = document.getElementById("regex").value;
    document.getElementById("loading").style.display = 'block';
    document.getElementById("done").style.display = 'none';
    result = ipcRenderer.sendSync('parse-pdf',filename, output, regex);
    document.getElementById("loading").style.display = 'none';
    document.getElementById("done").style.display = 'block';
};

