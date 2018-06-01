// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron')


var execEl = document.querySelector('.execute');
execEl.addEventListener('click', function () {
    filename = document.getElementById("filename").value;
    output = document.getElementById("output").value;
    regex = document.getElementById("regex").value;
    document.getElementById("loading").style.display = 'block';
    document.getElementById("done").style.display = 'none';
    result = ipcRenderer.sendSync('parse-pdf',filename, output, regex);
    document.getElementById("loading").style.display = 'none';
    document.getElementById("done").style.display = 'block';
});

