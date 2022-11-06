const http = require('http')
const url = require('url')
const fs = require('fs')


//Configuraciones del GATEWAY en archivo .env
const port = process.env.PORT || 8090
const host = process.env.HOST || '0.0.0.0'

const responseHeaders = {
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
}

const codes = {statusOk:200, notFound: 404}


const reparteRequest = (request,response,url,method) =>{
    switch(method){
        case 'GET': processRequestGet(request,response,url);
        break;
        case 'POST':;
        break;
        case 'PUT':;
        break;
        case 'DELETE':;
        break;
        default:;
        break;
    }
}

const processRequestPost = (req,res,url) => {}
const processRequestPut = (req,res,url) => {}
const processRequestDelete = (req,res,url) =>{} 
const processRequestGet = (req,res,url) => 
{
    let respuesta;
    idSucursal = url.split('/api/sucursales/')[1];

    if(idSucursal)
    {
        let sucursales = JSON.parse(fs.readFileSync('./sucursales.json').toString())
        respuesta = sucursales.sucursales.filter((f) => {return f.id == idSucursal});
    }
    else
        respuesta =JSON.parse(fs.readFileSync('./sucursales.json').toString()); //Lo parseo igual, porque sino abajo (que tengo toda la rta junta), me va a ahcer stringify de algo que no esta parceado y lo codifica mal

    res.writeHead(codes.statusOk,responseHeaders)
    res.end(JSON.stringify(respuesta)) //Me puedo dar la libertad de hacer esto, porque el readFile es async, entonces bloquea. Preguntar por si acaso si se prefiere que readF sea async

    req.on('data',(chunk) =>
    {
        body += chunk; 
    })

    req.on('error', (err) =>{
        createErrorResponse(req,"Error en la request en sucursales")
    })

}


const server = http.createServer( (req,res) =>
{ 
    //ACA RECIBE LAS PETICIONES, LLAMADAS REQUEST
 
    const {method , url} = req;
    console.log("sucursalesService")
    if(url.startsWith('/api/sucursales/') || url === '/api/sucursales')
    {
        reparteRequest(req,res,url,method)
        return;
    }

    createErrorResponse(req,'No se ha encontrado el recurso solicitado')
    //Si las solicitudes llegan a paths erroneos devolver codigos de error
});


const createErrorResponse = (res,message) =>{
    res.writeHead(codes.notFound,responseHeaders);
    res.end(JSON.stringify({message: message}))
}

const createOkResponse = (res,data) => {
    res.writeHead(codes.statusOk,responseHeaders);
    res.end(JSON.stringify({data}))
}


server.listen( port, (req,res) => {
    console.log(`SERVIDOR DE SUCURSALES: Levantado en puerto ${port}`)
} )
