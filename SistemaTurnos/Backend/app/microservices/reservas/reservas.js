const http = require('http')
const url = require('url')
const fs = require('fs')
const env = require('dotenv')

const reservasNotificationService = require('./reservasNotificationsService.js')
const reservasNotificationsService = require('./reservasNotificationsService.js')
const { createRecordatorio, bajaRecordatorio } = require('./recordatorios/recordatorios.js')
const { isNumberObject } = require('util/types')

env.config();

const envirioment_port_reservas = process.env.RESERVAS_PORT || 8080


const responseHeaders = {
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
}

const codes = {statusOk:200, notFound: 404}

const bodyParser = (req,res) =>{
    return new Promise((resolve,reject)=>{
        let body='';
        req.on('data', (c) => {
            body += c;
        })
        req.on('end', () => {
            resolve(body)
        })

        req.on('error',(err) => {
            reject('ERROR: en el body enviado al servidor de reservas');
        })
    })
}
    


const reparteRequest = (request,response,url,method) =>{
    switch(method){
        case 'GET': 
            processRequestGet(request,response,url);
            break;
        case 'POST':
            processRequestPost(request,response,url);
            break;
        case 'PUT': 
            processRequestPut(request,response,url);
            break;
        case 'DELETE':
            processRequestDelete(request,response,url);
            break;
        case 'OPTIONS':
            createOkResponse(response,{message:'Options OK!'});
            break;
        default:;
    }
}

const processRequestPut = (req,res,url) => {
    createErrorResponse(res,'ERROR: Recurso no encontrado')
}


const processRequestPost = (req,res,url) => {
    bodyParser(req,res).then( (body) => {
        if(body)
            req.body = JSON.parse(body);
        else
            req.body=''

        const slug = url.split('/api/reservas/')[1]; // Tengo que tener una forma de diferenciar si es para usuario o sucursal... (reserva no pq nunca va a ser get)

        if(slug) //aunque tengo q saber si es reserva o sucursal...
        {   
            if(req.body)
            {
                if(slug.startsWith('solicitar/'))
                {
                    const idReserva = url.split('solicitar/')[1]; // Tengo que tener una forma de diferenciar si es para usuario o sucursal... (reserva no pq nunca va a ser get)
                    if(idReserva && idReserva != 'undefined' && idReserva != 'null')
                    {   
                        console.log(idReserva)
                        if(validaID(req.body.userId))
                        {
                            console.log(req.body.userId)
                            let ok = false;
                            let reservas = JSON.parse(fs.readFileSync('./reservas.json').toString())
                            reservas.map((element) => { //nO ES NECESARIO Q SEA UN MAP
                                if(element.idReserva == idReserva)
                                    if(element.userId == -1 && element.status == 0) 
                                    {
                                        element.userId = Number(req.body.userId);
                                        element.status = 1
                                        ok = true;
                                    }
                            })
                            if(ok)
                            {
                                fs.writeFileSync('./reservas.json', JSON.stringify(reservas));
                                createOkResponse(res,{message: "El turno fue reservado, confirmelo antes del minuto o sera dado de baja!"});
                                let timeout = setTimeout(() => //Si al pasar los segundos, el turno no se confirmo, lo baja
                                {
                                    console.log(idReserva)
                                    let ok = false;
                                    let reservas = JSON.parse(fs.readFileSync('./reservas.json').toString())
                                    reservas.map((element) => { //nO ES NECESARIO Q SEA UN MAP
                                        if(element.idReserva == idReserva)
                                            if(element.status != 2) 
                                            {
                                                element.userId = -1;
                                                element.status = 0
                                                ok = true;
                                            }
                                     })
                                if(ok)
                                {
                                    fs.writeFileSync('./reservas.json', JSON.stringify(reservas)); //Perdio el turno   
                                }
                                else
                                    console.log("YA LO CONFIRMO EL TURNO!")//createErrorResponse(req,'El turno no se ha podido reservar!') NO PERDIO EL TURNO!
                                     
                                }, 60000);
                                return;
                            }
                                createErrorResponse(res,'ERROR : No se pudo reservar el turno porque no esta disponible!')
                        }
                        else
                            createErrorResponse(res,'ERROR: Algun parametro es erroneo')
                    }
                    else   
                        createErrorResponse(res,'ERROR: idReserva es nulo')
                }
                else if(slug.startsWith('confirmar/'))
                {
                    console.log("acaaa")
                    const idReserva = url.split('confirmar/')[1]; // Tengo que tener una forma de diferenciar si es para usuario o sucursal... (reserva no pq nunca va a ser get)
                    if(idReserva)
                    {
                        if(validaID(req.body.userId) && validaEmail(req.body.email))
                        {
                            let ok = false;
                            let reservas = JSON.parse(fs.readFileSync('./reservas.json').toString())
                            let fecha;
                            reservas.map((element) => 
                            { //nO ES NECESARIO Q SEA UN MAP
                                if(element.idReserva == idReserva)
                                    if(element.userId == req.body.userId && element.status == 1) //la primer parte del if la tengo q mover mas arriba, para q no analice si viene un id vacio
                                    {
                                        element.userId = Number(req.body.userId);
                                        element.email = req.body.email;
                                        element.status = 2
                                        fecha = new Date(element.dateTime);
                                        ok = true;
                                    }
                            })
                            if(ok)
                            {
                                fs.writeFileSync('./reservas.json', JSON.stringify(reservas));
                                reservasNotificationService.createNotification(req.body.email, "CONFIRMACION TURNO",`Hola, el dia ${fecha.toLocaleDateString()} a la hora ${fecha.toLocaleTimeString()} reservaste un turninho en el #PotreroDeCoccaro. <img src="./imgs/ronaldinho-tongue.gif">`).then((res) => {
                                    console.log("CREATE NOTIFICATION: LLego al resolve " + res)
                                })
                                createRecordatorio(req.body,fecha).then((res) => {
                                    console.log("CREATE RECORDATORIO: LLego al resolve " + res)
                                })

                                createOkResponse(res,{message: "El turno se confirmo con exito!"});
                                return;
                            }
                            else
                                createErrorResponse(res,'No se ha podido registrar la reserva')
                        }
                        else
                            createErrorResponse(res, 'ERROR: algun parametro es erroneo')
                    }
                    else
                        createErrorResponse(res,'ERROR: idReserva nulo')
                }
                else
                    createErrorResponse(res,'ERROR: Recurso no encontrado');                
            }
            else   
                createErrorResponse(res,'ERROR: Recurso no encontrado');    
        }
        else
            createErrorResponse(res,"ERROR: un parametro es erroneo")

        }).catch((err) => 
        {        
            createErrorResponse(res,err)
        })

 
}
const processRequestDelete = (req,res,url) =>
{

    bodyParser(req,res).then( (body) => 
    {
        if(body)
            req.body = JSON.parse(body);
        else
            req.body=''

        const slug = url.split('/api/reservas/')[1]; // Tengo que tener una forma de diferenciar si es para usuario o sucursal... (reserva no pq nunca va a ser get)

        if(slug) //aunque tengo q saber si es reserva o sucursal...
        {   
            if(req.body)
            {
                if(Number(slug)) //Es un delete
                {
                    if(validaID(req.body.userId))
                    {
                        let ok = false;
                        let reservas = JSON.parse(fs.readFileSync('./reservas.json').toString())
                        reservas.map((element) => { //deberia usar mejor el map jeje, lo estoy suando mal
                        if(element.idReserva == slug && element.userId == req.body.userId)
                        {
                            element.userId = -1;
                            element.email = "";
                            element.status = 0;
                            ok = true;
                        }
                        })
                        if(ok)
                        {
                            fs.writeFileSync('./reservas.json', JSON.stringify(reservas));
                            bajaRecordatorio(req.body).then((res) => {console.log("tumbo el recordatorio")});
                            createOkResponse(res,{message: "El turno se ELIMINO con exito"});
                            return;
                        }
                        else
                            createErrorResponse(res, "ERROR: No se ha podido eliminar el turno")
                    }
                    else   
                        createErrorResponse(res,"ERROR: Algun parametro es erroneo")
                }
            }
        }
    })

} 


const processRequestGet = (req,res,url) => 
{
    let respuesta;
    //el [1] hace que se quede siempre con la parte de la derecha
    const slug = url.split('/api/reservas/')[1]; // Tengo que tener una forma de diferenciar si es para usuario o sucursal... (reserva no pq nunca va a ser get)
    console.log(slug)
    
    if(slug) // /api/reservas/:slug TRAIGO UNA RESERVA EN ESPECIFICO
    {
        if(Number(slug)) //Es correcto el slug
        {
            reservas = JSON.parse(fs.readFileSync('./reservas.json').toString())   
            respuesta = reservas.filter((f) => {return f.idReserva == slug});
            createOkResponse(res,respuesta);
            return;
        }
        else
        {
            createErrorResponse(res,'Recurso no encontrado')
            return;
        }    
    }
    else // /api/reservas o /api/reservas?
    {
        console.log(url)
        let reservas;
        const queryP = url.split('/api/reservas?')[1]
        const queryParams = new URLSearchParams(queryP);
        if(queryParams.has('userId') || queryParams.has('dateTime') || queryParams.has('branchId')) //Significa que estoy en el get con filtros
        {
            reservas = JSON.parse(fs.readFileSync('./reservas.json').toString())
            let filtros = [];
            if(queryParams.has('userId') && queryParams.get('userId')!='')
                filtros.push({filtro:'userId',valor:queryParams.get('userId')})
            if(queryParams.has('dateTime') && queryParams.get('dateTime')!='')
                filtros.push({filtro:'dateTime',valor:queryParams.get('dateTime')})
            if(queryParams.has('branchId') && queryParams.get('branchId')!='') 
                filtros.push({filtro:'branchId',valor:queryParams.get('branchId')})
            console.log(filtros)
            let respuesta = reservas;
            filtros.forEach((filtro) => {
                
                respuesta = respuesta.filter((r) => {
                    if(filtro.filtro == 'dateTime')
                    {
                        const date1= r[filtro.filtro].split('T')[0]; //2022-10-04
                        const date2= filtro.valor; //2022-10-04
                        return date1 == date2;
                    }
                    else
                        return r[filtro.filtro] == filtro.valor
                })
            })

            createOkResponse(res,respuesta);
            return;

        } // /api/reservas sin querys, trae todas las reservas
        else if(url == '/api/reservas')
        {
            reservas = JSON.parse(fs.readFileSync('./reservas.json').toString())   
            createOkResponse(res,reservas);
            return;
        }
        else
        {
            console.log("ACAA")
            createErrorResponse(res,'ERROR: Recurso no ecnontrado');
            return;
        }
        
    }

    createErrorResponse(res,'ERROR: Recurso no ecnontrado');

//Me puedo dar la libertad de hacer esto, porque el readFile es async, entonces bloquea. Preguntar por si acaso si se prefiere que readF sea async
    

}


const server = http.createServer( (request,response) =>
{ 

    console.log("llego?")
    const {method , url} = request;
    console.log(method)
    if(url.startsWith('/api/reservas/') || url === '/api/reservas' || url.startsWith('/api/reservas?'))
    {
        reparteRequest(request,response,url,method);
        return;
    }


    createErrorResponse(request,'No se encontro el recurso')

    
    //Si las solicitudes llegan a paths erroneos devolver codigos de error
});

server.listen( envirioment_port_reservas, (req,res) => {
    console.log(`SERVIDOR DE RESERVAS: Levantado en puerto ${envirioment_port_reservas}`)
} );


const validaID = (userId) => {
    id = Number(userId);
    console.log(id)
    if(userId === '') return false; //harcodeadisimo pero eficiente :)

    return id !== undefined && id !== NaN && isNumberObject(new Number(id)) && id > -1
}


const validaEmail = (email) =>{
    return email && email !== '';
}


const createErrorResponse = (res,message) =>
{
    if(typeof(message) == 'object')
        message = JSON.stringify(message);
    else
        if(!message.includes('message'))
            message = JSON.stringify({message: message});

    res.writeHead(codes.notFound,responseHeaders)
    console.log(message)
    res.end(message) 
}

const createOkResponse = (res,data) => 
{   console.log(data)
    if(typeof(data) == 'object')
        data = JSON.stringify(data);
    res.writeHead(codes.statusOk, responseHeaders);
    res.end(data);
}