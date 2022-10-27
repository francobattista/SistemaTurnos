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


const reparteRequest = (request,response,url,method) =>{
    console.log(method)
    switch(method)
    {
        case "GET":
            redirectRequestGet(request,response,url)
            break;
        case "POST":
            redirectRequestPost(request,response,url)
            break;
        case "DELETE":
            redirectRequestDelete(request,response,url)
            break;
        case "OPTIONS": // || "PUT" 
            //console.log("OPTIONSSW")
            //redirectRequestPut(request,response,url)
            response.writeHead(codes.statusOk,responseHeaders);
            response.end(JSON.stringify({Hola:123}));
            break;
        case "PUT":
            console.log("PUTSW")
            redirectRequestPut(request,response,url)
            break;
        default:
            console.log("default")
            response.writeHead(codes.notFound,responseHeaders);//codigoError
            response.end(JSON.stringify({error:"ERROR: METODO DESCONOCIDO"}));
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
            rej();
        })
    })
    

}
/*const reservas = (req,res,path) => 
{
    reservasService.getReservasSucursal(res,req,path);

    //reservasService.getReservasUsuario(res,req,path); 
}*/

/*
const sucursales = (req,res,url)  => {

    idSucursal = url.split('/api/sucursales/')[1];
    if(idSucursal)
        sucursalesService.getSucursal(req.headers,idSucursal).then(//hace falta diferenciar? total, solo con redireccionar la url todo ok
        (respuesta) => {
            res.writeHead(codes.statusOk,responseHeaders); res.end(JSON.stringify(respuesta))
        }).catch((err)=>{}); 
    else
        sucursalesService.getSucursales().then(
        (respuesta) => {
            res.writeHead(codes.statusOk,responseHeaders); res.end(JSON.stringify(respuesta))
        }).catch((err) => {});
        

    //else
    
}*/



const redirectRequestDelete = (req,res,url) => {};



const redirectRequestPut = (req,res,url) => {

    bodyParser(req,res).then( (body) => {
        req.body = body;
        console.log(req.body)
        if(url.startsWith('/api/reserva/'))
        {
            reservasService.putMethod(url,req.body).then( //No me importa si va a reservas/1 o a reservas/. Solo redirecciono y que se arregle reservas.js
            (respuesta) => {
                console.log(respuesta)
                res.writeHead(codes.statusOk,responseHeaders); res.end(JSON.stringify(respuesta))
            }).catch((err)=>{res.writeHead(codes.notFound,responseHeaders); res.end(JSON.stringify({mensaje:"Error"}))}); 
            return; //para cortar ejec
        }
    
        res.writeHead(codes.notFound,responseHeaders)
        res.end();//codigo de rror

    })


};
const redirectRequestPost = (req,res,url) => {};



//MANEJO LOS GETS. 
const redirectRequestGet = (req,res,url) => 
{
    if(url.startsWith('/api/reserva'))
    {
        reservasService.getMethod(url).then( //No me importa si va a reservas/1 o a reservas/. Solo redirecciono y que se arregle reservas.js
        (respuesta) => {
            console.log(respuesta)
            res.writeHead(codes.statusOk,responseHeaders); res.end(JSON.stringify(respuesta))
        }).catch((err)=>{res.writeHead(codes.notFound,responseHeaders); res.end(JSON.stringify({mensaje:"Error"}))}); 
        return; //para cortar ejec
    }

    if(url.startsWith('/api/sucursales')) 
    {
        sucursalesService.getMethod(url).then(//hace falta diferenciar? total, solo con redireccionar la url todo ok
        (respuesta) => {
            //console.log(respuesta)
            res.writeHead(codes.statusOk,responseHeaders); res.end(JSON.stringify(respuesta))
        }).catch((err)=>{console.log(err)});
        return;
    }

    res.writeHead(codes.notFound,responseHeaders)
    res.end();//codigo de rror



}

//Crea el server y recibe las request del cliente
const server = http.createServer( (request,response) =>
{ 


    const {method , url} = request;
    console.log(url)
    if(url.startsWith('/api'))
    {
        reparteRequest(request,response,url,method)
        return;
    }
    console.log("Aca no llega!")
    response.writeHead(codes.notFound,responseHeaders);
    response.end(JSON.stringify({error:1}));
    


    
    //Si las solicitudes llegan a paths erroneos devolver codigos de error
});




server.listen( port, () => {
    console.log(`GATEWAY LEVANTADO EN EL PUERTO ${port}`)
} )


