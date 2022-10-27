const http = require('http')
const url = require('url')
const fs = require('fs')

const port = process.env.PORT || 8080

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
        case 'POST':;
        case 'PUT': processRequestPut(request,response,url);;
        case 'DELETE':;
        default:;
    }
}

const processRequestPost = (req,res,url) => {}
const processRequestPut = (req,res,url) => {

    let body='';
    req.on('data',(c)=>{
        body += c;
    })


    let respuesta;
    const slug = url.split('/api/reserva/')[1]; // Tengo que tener una forma de diferenciar si es para usuario o sucursal... (reserva no pq nunca va a ser get)
    if(slug) //aunque tengo q saber si es reserva o sucursal...
    {   
        console.log(body);
        if(body)
        {
            let ok = false;
            let reservas = JSON.parse(fs.readFileSync('./reservas.json').toString())
            reservas.map((element) => {
                if(element.id == slug)
                    if(element.userId == "")
                    {
                        element.userId = body.userId
                        ok = true;
                    }
            })
            if(ok)
            {
                fs.writeFileSync('./reservas.json', JSON.stringify(reservas));
                res.writeHead(codes.statusOk,responseHeaders)
                res.end(JSON.stringify({Message: "Todo OK"})) //Me puedo dar la libertad de hacer esto, porque el readFile es async, entonces bloquea. Preguntar por si acaso si se prefiere que readF sea async
                return;
            }

        }
    }
    res.writeHead(codes.notFound,responseHeaders) //podria ser otro error.
    res.end(JSON.stringify({Message: "Todo MAL"}))


 
}
const processRequestDelete = (req,res,url) =>{} 
const processRequestGet = (req,res,url) => 
{
    let respuesta;
    //el [1] hace que se quede siempre con la parte de la derecha
    const slug = url.split('/api/reserva/')[1]; // Tengo que tener una forma de diferenciar si es para usuario o sucursal... (reserva no pq nunca va a ser get)
    if(slug) //aunque tengo q saber si es reserva o sucursal...
    {
        let reservas = JSON.parse(fs.readFileSync('./reservas.json').toString())   
        respuesta = reservas.reservas.filter((f) => {console.log(f.branchId, slug);return f.branchId == slug}); //return para que corte la ejecucion. Deberia devolver el cod error o de OK aca?
    }
    else //todas las respuestas
        respuesta = JSON.parse(fs.readFileSync('./reservas.json').toString())   

    res.writeHead(codes.statusOk,responseHeaders)
    res.end(JSON.stringify(respuesta)) //Me puedo dar la libertad de hacer esto, porque el readFile es async, entonces bloquea. Preguntar por si acaso si se prefiere que readF sea async
    

}


const server = http.createServer( (request,response) =>
{ 

    console.log("llego?")
    const {method , url} = request;
    if(url.startsWith('/api/reserva'))
    {
        reparteRequest(request,response,url,method);
        return;
    }


    response.writeHead(codes.notFound,headers)
    response.end();
    
    //Si las solicitudes llegan a paths erroneos devolver codigos de error
});

server.listen( port, (req,res) => {
    console.log("SERVIDOR DE RESERVAS LEVANTADO EN: " + port)
} )

