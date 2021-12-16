var http = require("http");
var url = require("url");
var port = 9889;

http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type":"text/html"});
    let param = url.parse(req.url, true).query;
    let txt = param.year + " " + param.month
    res.end(txt);
}).listen(port)

// http://localhost:9777/?year=2021&month=December


/* var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    let param = url.parse(req.url, true).query;
    let txt = param.year + " " + param.month;
    res.end(txt);
}).listen(9777) */