const http = require('http')
const url = require('url')
const fs = require('fs')


//Configuraciones del GATEWAY en archivo .env
const enviroment_sucursales_port = process.env.SUCURSALES_PORT || 8090
const enviroment_sucursales_path = process.env.SUCURSALES_PATH || 'http://localhost:'

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
        respuesta = sucursales.filter((f) => {return f.id == idSucursal});
    }
    else
        respuesta =JSON.parse(fs.readFileSync('./sucursales.json').toString()); //Lo parseo igual, porque sino abajo (que tengo toda la rta junta), me va a ahcer stringify de algo que no esta parceado y lo codifica mal

    createOkResponse(res,respuesta);

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
    if(typeof(message) == 'object')
        message = JSON.stringify(message);
    else
        if(!message.includes('message'))
            message = JSON.stringify({message: message});
    res.writeHead(codes.notFound,responseHeaders);
    res.end(message)
}

const createOkResponse = (res,data) => {

    if(typeof(data) == 'object')
        data = JSON.stringify(data);

    res.writeHead(codes.statusOk,responseHeaders);
    res.end(data);
}


server.listen( enviroment_sucursales_port, (req,res) => {
    console.log(`SERVIDOR DE SUCURSALES: Levantado en puerto ${enviroment_sucursales_port}`)
} )
