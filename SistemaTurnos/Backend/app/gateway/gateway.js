const http = require('http')
const url = require('url')

const sucursalesService = require('./services/sucursalesService.js')
const reservasService = require('./services/reservasService.js')


//Configuraciones del GATEWAY en archivo .env
const enviroment_gatway_port = process.env.PORT || 3030
const enviroment_gatway_host = process.env.HOST || '127.0.0.1'


const responseHeaders = {
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
}

const codes = {statusOk:200, notFound: 404}


const reparteRequest = (req,res,url,method) =>{
    console.log(method)
    switch(method)
    {
        case "GET":
            redirectRequestGet(req,res,url)
            break;
        case "POST":
            redirectRequestPost(req,res,url)
            break;
        case "DELETE":
            redirectRequestDelete(req,res,url)
            break;
        case "OPTIONS":
            res.writeHead(codes.statusOk,responseHeaders);
            res.end(JSON.stringify({message:'OPTIONS REQUEST: OK!'}));
            break;
        case "PUT":
            redirectRequestPut(req,res,url)
            break;
        default:
            createErrorResponse(res,'Metodo desconocido');
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

        req.on('error',(e) => {
            rej('ERROR: El body enviado tiene errores');
        })
    })
    

}

const redirectRequestDelete = (req,res,url) => {};


//MANEJO LOS POST. 

const redirectRequestPost = (req,res,url) => {

    bodyParser(req,res).then( (body) => 
    {
        req.body = body;
        console.log(req.body)
        if(url.startsWith('/api/reservas/')) 
        {
            if(Number(JSON.parse(req.body).userId) !== 0)//EXPLICACION: SI PASA POR ESTE GATEWAY TIENE QUE SER SI O SI UN USERID = 0
            {
                createErrorResponse(res,'ERROR: En este modo solo pueden reservar como invitado');
                return;
            }        
            reservasService.postMethod(url,req.body).then( //No me importa si va a reservas/1 o a reservas/. Solo redirecciono y que se arregle reservas.js
            (respuesta) => {
                createOkReponse(res,respuesta)
            }).catch((err)=>{createErrorResponse(res,err)}); 
            return; //para cortar ejec
        }
        createErrorResponse(res,'ERROR: No se ha encontrado el recurso solicitado')    

    }).catch((err) => {createErrorResponse(res,"Error, parametros de body incorrectos")})


};

const redirectRequestPut = (req,res,url) => {

    console.log("MANEJO DE PUT EN GATEWAY")

};



//MANEJO LOS GETS. 
const redirectRequestGet = (req,res,url) => 
{
    if(url.startsWith('/api/reservas/') || url === '/api/reservas' || url.startsWith('/api/reservas?'))
    {
        reservasService.getMethod(url).then( //No me importa si va a reservas/1 o a reservas/. Solo redirecciono y que se arregle reservas.js
        (respuesta) => {
            createOkReponse(res,respuesta)
        }).catch((err)=>{createErrorResponse(res,err)}); 
        return; //para cortar ejec
    }

    console.log(url)
    if(url.startsWith('/api/sucursales/') || url === '/api/sucursales') //Hay q ver si el enpoint va a ser asi sin / final
    {
        sucursalesService.getMethod(url).then(//hace falta diferenciar? total, solo con redireccionar la url todo ok
        (respuesta) => {
            createOkReponse(res,respuesta)
        }).catch((err)=>{createErrorResponse(res,err)});
        return;
    }

    createErrorResponse(res,'ERROR: No se ha encontrado el recurso solicitado')    

}

//Crea el server y recibe las request del cliente
const server = http.createServer( (req,res) =>
{ 


    const {method , url} = req;
    if(url.startsWith('/api/')) // /api sin la / no significa nada, preferible no tratarlo a no ser que se implemente algo con eso 
    {
        reparteRequest(req,res,url,method)
        return;
    }

    createErrorResponse(res,'No se ha enconrtado el recurso solicitado')    

    
    //Si las solicitudes llegan a paths erroneos devolver codigos de error
});



const createErrorResponse = (res,message) =>{
    console.log(message)
    console.log(typeof(message))

    if(!message.includes('message'))
    {
        if(typeof(message) == 'object')
            message = JSON.stringify(message);
        else
            message = JSON.stringify({message: message});
    }
    
    res.writeHead(codes.notFound,responseHeaders);
    res.end(message)

}

const createOkReponse = (res,data) => {

    console.log("Create ok response")
    console.log(data)
    if(typeof(data) == 'object')
        data = JSON.stringify(data);
    res.writeHead(codes.statusOk,responseHeaders)
    res.end(data)

}


server.listen( enviroment_gatway_port, () => {
    console.log(`SERVIDOR DE GATEWAY: Levantado en puerto ${enviroment_gatway_port}`)
} )


