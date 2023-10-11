/* global __dirname */

var express = require('express');
const fs = require('fs');
var app = express();
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

//static files
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    const htmlContent = fs.readFileSync(__dirname + '/index.html', 'utf8');
    const updatedHtmlContent = htmlContent.replace('${packageJson.version}', packageJson.version);
    res.send(updatedHtmlContent);
});

app.listen(4000, function() {
    console.log('Example app listening on port 4000!');
});