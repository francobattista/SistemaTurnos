const http = require('http')
const url = require('url')

const sucursalesService = require('./services/sucursalesService.js')
const reservasService = require('./services/reservasService.js')


//Configuraciones del GATEWAY en archivo .env
const port = process.env.PORT || 3030
const host = process.env.HOST || '0.0.0.0'


const responseHeaders = {
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS',
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
            res.end(JSON.stringify({Hola:123}));
            break;
        case "PUT":
            console.log("PUTSW")
            redirectRequestPut(req,res,url)
            break;
        default:
            console.log("default")
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

        req.on('error',() => {
            rej('Error en el body');
        })
    })
    

}

const redirectRequestDelete = (req,res,url) => {};


//MANEJO LOS PUTS. 

const redirectRequestPut = (req,res,url) => {

    bodyParser(req,res).then( (body) => 
    {
        req.body = body;
        console.log(req.body)
        if(url.startsWith('/api/reservas/')) 
        {
            reservasService.putMethod(url,req.body).then( //No me importa si va a reservas/1 o a reservas/. Solo redirecciono y que se arregle reservas.js
            (respuesta) => {
                console.log(respuesta)
                res.writeHead(codes.statusOk,responseHeaders); res.end(JSON.stringify(respuesta))
            }).catch((err)=>{createErrorResponse(res,err)}); 
            return; //para cortar ejec
        }
    

        createErrorResponse(res,'No se encontro el recurso')

    }).catch((err) => {createErrorResponse(res,err)})


};
const redirectRequestPost = (req,res,url) => {};



//MANEJO LOS GETS. 
const redirectRequestGet = (req,res,url) => 
{
    if(url.startsWith('/api/reservas/') || url === '/api/reservas' || url.startsWith('/api/reservas?'))
    {
        reservasService.getMethod(url).then( //No me importa si va a reservas/1 o a reservas/. Solo redirecciono y que se arregle reservas.js
        (respuesta) => {
            console.log(respuesta)
            res.writeHead(codes.statusOk,responseHeaders);console.log("por responder"); res.end(JSON.stringify(respuesta))
        }).catch((err)=>{createErrorResponse(res,err)}); 
        return; //para cortar ejec
    }

    console.log(url)
    if(url.startsWith('/api/sucursales/') || url === '/api/sucursales') //Hay q ver si el enpoint va a ser asi sin / final
    {
        sucursalesService.getMethod(url).then(//hace falta diferenciar? total, solo con redireccionar la url todo ok
        (respuesta) => {
            res.writeHead(codes.statusOk,responseHeaders); res.end(JSON.stringify(respuesta))
        }).catch((err)=>{createErrorResponse(res,err)});
        return;
    }

    createErrorResponse(res,'No se ha enconrtado el recurso solicitado')    

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
    res.writeHead(codes.notFound,responseHeaders);
    res.end(JSON.stringify({"messageError": message}))

}

const createOkReponse = (res,message) => {

}


server.listen( port, () => {
    console.log(`SERVIDOR DE GATEWAY: Levantado en puerto ${port}`)
} )


