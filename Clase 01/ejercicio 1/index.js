var http = require("http");
var url = require("url");
var port = 9560;

http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type":"text/html"});
    let param = url.parse(req.url, true).query;
    let txt = param.nombre + " " + param.apellido + " " + param.telefono;
    res.end(txt)
}).listen(port)

// http://localhost:9560/?nombre=Natalia&apellido=Diez

console.log("servidor funcionando en puerto " + port)