var fs = require("fs");
var http = require("http");

let tipoArchivo = "archivo.txt"
let contenidoArchivo = "Usted debe abonar la cantidad de $354.556"

fs.appendFile(tipoArchivo,contenidoArchivo, function(err){
    if (err) throw err;
    console.log("Archivo creado con éxito")
})

http.createServer(function(req,res){
    fs.readFile("index.html",function(err,data){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(data);
        return res.end(); // el return es para que no repita eternamente
    })
}).listen(8085);