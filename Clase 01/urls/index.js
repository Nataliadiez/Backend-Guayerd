// URL = unified remote link

// Llamar a los módulos externos
var http = require("http");
var port = 9998

http.createServer(function(req,res){
    res.writeHead(200, {"Content-Type": "text/html"})
    res.write(req.url)
    res.end()


}).listen(port)
console.log("Servidor corriendo en puerto: " + port)