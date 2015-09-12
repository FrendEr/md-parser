/*
 * markdown parser
 */
var express = require('express');
var md = require('marked');
var fs = require('fs');

var app = module.exports = express();

app.engine('md', function(filePath, options, fn) {
    fs.readFile(filePath, function(err, content) {
        if (err) fn(err);

        var html = md(content.toString());
        html = html.replace(/\{([^}]+)\}/g, function(match, key) {
            return options[key] || '';
        });
        return fn(null, html);
    });
});

app.set('views', './views');
app.set('view engine', 'md');

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Md-Parser',
        desction: 'A markdown parse server to translate markdown files to html.'
    });
});

app.listen(3000);
console.log('start in port: 3000');
