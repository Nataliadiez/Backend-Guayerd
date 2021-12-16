// Llamar a las librerias
var http = require("http");
var fs = require("fs");
var formidable = require("formidable");

// Creamos el server que nos permite subir archivos
http.createServer(function(req,res){
    if(req.url == "/fileupload"){
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files){
            var oldpath = files.filetoupload.filepath;
            var newpath = "Aca va su ruta para subir archivos" + files.filetoupload.originalFilename;
            fs.rename(oldpath, newpath, function(err){
                if(err) throw err;
                res.write("Tu archivo fue subido con éxito");
                res.end();
            });
        });
    } else {
        res.writeHead(200, {"Content-Type":"text/html"});
        res.write('<form action="fileupload" method="post" enctype="multipar/form-data">');
        res.write('<input type="file" name="filetoupload"><br/>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(8090)
