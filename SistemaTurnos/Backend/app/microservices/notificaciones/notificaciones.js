const http = require('http')
const url = require('url')
const fs = require('fs')
const env = require('dotenv');
const notificationsService = require('./notificationsService');


env.config();

//Configuraciones del GATEWAY en archivo .env
const port = process.env.PORT || 8070
const host = process.env.HOST || '127.0.0.1'

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
        case 'POST':processRequestPost(request,response,url);
        break;
        case 'PUT':;
        break;
        case 'DELETE':;
        break;
        default:;
        break;
    }
}


const bodyParser = (req,res) =>{
    return new Promise((res,rej)=>{
        let body='';
        req.on('data', (c) => {
            body += c;
    
        })
        req.on('end', () => {
            res(body)
        })

        req.on('error',() => {
            rej('Error en el body');
        })
    })
    

}

const processRequestPost = (req,res,url) => {

    bodyParser(req,res).then((body)=>{
        req.body = JSON.parse(body)
        notificationsService.confirmationEmail(req.url,req.body).then((response)=>{
            res.writeHead(codes.statusOk,responseHeaders); 
            res.end(JSON.stringify({message:'Confirmacion enviada con exito!'}))
        }).catch((err) => {createErrorResponse(res,'No se ha podido enviar la confirmacion del mail' + err)});
    })
}
const processRequestPut = (req,res,url) => {}
const processRequestDelete = (req,res,url) =>{} 
const processRequestGet = (req,res,url) => {}


const server = http.createServer( (req,res) =>
{ 
    //ACA RECIBE LAS PETICIONES, LLAMADAS REQUEST
 
    const {method , url} = req;
    console.log(method)
    console.log(url)
    if(url.startsWith('/api/notificacion/') || url === '/api/notificacion')
    {
        reparteRequest(req,res,url,method)
        return;
    }

    createErrorResponse(res,'No se ha encontrado el recurso solicitado')
    //Si las solicitudes llegan a paths erroneos devolver codigos de error
});


const createErrorResponse = (res,message) =>{

    res.writeHead(codes.notFound,responseHeaders);
    res.end(JSON.stringify({messageError: message}))

}



server.listen( port, (req,res) => {
    console.log(`SERVIDOR DE NOTIFICACIONES: Levantado en puerto ${port}`)
} )
