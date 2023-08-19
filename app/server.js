const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen(process.env.PORT || 3000);

//let fs = require("fs");
//let envContent = fs.readFileSync(process.argv[2], 'ascii');
//console.log(envContent)
//let fileWriter = fs.createReadStream('.env', {flags: 'w'});
//let envFormatted = '';
//envContent.split(/\r?\n/).forEach(element => {
//    if(element[0]!=='#'){
//        envFormatted += `REACT_APP_${element}\n`
//        console.log(envFormatted)
//    }
//});
//fileWriter.write(envFormatted);
//fileWriter.end();
//"scripts": {
//    "start": "node server.js .env && react-scripts start",
//    "start-api": "cd api venv/Scripts/activate && flask run",
//    "dev": "react-scripts start",
//    "build": "node server.js .env && react-scripts build",
//    "test": "react-scripts test",
//    "eject": "react-scripts eject"
//  },