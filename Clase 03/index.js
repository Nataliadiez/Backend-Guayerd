/* Armar un sitio web y servirlo desde node, utilizan el filesystem

Sumar un form de contacto que se envíe por una url dinámica y los inputs 
pasen como parámetros.
Tomar los datos del form y crear un archivo de texto (txt) con los datos 
puestos en el form.
El navbar debe llevar a url estáticas creadas con la librería “url” de node */

const urlHome = new URL('http://localhost:8080/home');
const urlProductos = new URL('http://localhost:8080/productos');


var http = require("http");
var fs = require("fs");
var url = require("url");
var formidable = require("formidable")

var port = 8080



http.createServer(function(req,res){
    let contenidoFormulario = `
        <h1>Formulario</h1>
            <form action="formularioenviado" method="post">
                <div>
                    <label for="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre">
                </div>

                <div>
                    <label for="apellido">Apellido</label>
                    <input type="text" id="apellido" name="apellido">
                </div>

                <div>
                    <label for="telefono">Teléfono</label>
                    <input type="text" id="telefono" name="telefono">
                </div>

                <div>
                    <button type="submit" onClick={sendForm()}>Enviar</button>
                </div>
            </form>
        </body>
    </html>
    `
    let encabezadoHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta id="viewport" content="width=device-width, initial-scale=1.0">
            <title>Formulario</title>
        </head>
        <body>
        <navbar>
            <a href="http://localhost:8080/home">Home</a>
            <a href="http://localhost:8080/productos">Productos</a>
        </navbar>
        `
    

    if (req.url == "/") {
        fs.appendFile("home.html",encabezadoHtml + contenidoFormulario,function(err){
            if (err) {console.log("error en agregado de contenido HTML")}
            console.log("Formulario agregado al HTML")
    
            fs.readFile("home.html",function(err,data){
                if (err) {console.log("error en lectura de archivo")}
                res.writeHead(200, {"Content-Type":"text/html"});
                res.write(data);
                console.log("Se leyó el archivo")
                
                fs.unlink("home.html",(err) => {
                    if (err) console.log("error en borrado")
                    console.log("Se borró un archivo")
                })
                return res.end();
            })
        })
    } else if (req.url == "/formularioenviado") {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files){            
            console.log(fields)
            var datosFormulario = "";
            for(const campo in fields){
                datosFormulario += `${campo}: ${fields[campo]}\n`
            }
            datosFormulario+= "\n-------------- \n \n"
            /* Object.keys(fields).forEach(key => {
                console.log(key)
                console.log(fields[key])
            }) */
            fs.appendFile("datos.txt",datosFormulario, function(err){
                if (err) throw err;
            })
        });
        res.writeHead(200, {"Content-Type":"text/html"});
        res.write("Gracias por enviar tus datos");
        /* res.write(req.headers.host) */
        res.end();

    } else if (req.url == "/home"){
        res.writeHead(200, {'Location': 'https://example.com' + req.url});
        res.write("Esto es el home");
        res.end();

    } else if (req.url == "/productos"){
        
        res.writeHead(200, {"Content-Type":"text/html"});
        res.write("Estos son los productos");
        res.end();
    }
    
    

    
    
    /* fs.appendFileSync("home.html", encabezadoHtml + contenidoFormulario);
    console.log(fs.readFileSync('home.html',"utf8"));
    fs.unlinkSync('home.html'); */
    

}).listen(port)

console.log("Servidor conectado en el puerto " + port);



