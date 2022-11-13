// DUDAS -> Los metodos que no requieren autenticacion de token, tambien hay que meterlos aca? por ejemplo el alta de reserva puede hacerse con
// o sin token. O la idea es duplicar el api y que ahora siempre q el usuario este logueado se apunte aca?

//TODOS ESTOS RECURSOS RECIBEN EL TOKEN Y LO VALIDA

const sucursalesService = require('./services/sucursalesServices.js')
const reservasService = require('./services/reservasServices.js')
const env = require('dotenv');
const express = require('express');
const app = express();
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

const responseHeaders = {
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
}

env.config();

const enviroment_gatway_host = process.env.GATEWAY_AUTH_HOST;
const enviroment_gatway_port = process.env.GATEWAY_AUTH_PORT;

app.set('name','ElPotreroDeCoccaro');


const checkJwt = auth({
    audience: 'R7MwFIXgCMgvblhVY6aGMLEpZ769rfpr',
    issuerBaseURL: `https://dev-enjgvjw7srdpn1x1.us.auth0.com/`,
});


const middlewareEntrada = (req,res,next) =>{
    console.log(req.method);
    next();
}

const middlewareSalida = (err,req,res,next) =>{
    console.log("Salida Err");
    console.log(err.status)
    console.log(res.statusCode)
    if(err.status)
    {
        res.writeHead(err.status,responseHeaders);
        res.end(JSON.stringify({message:"ERROR: DEBE ESTAR LOGEADO"}))
    }
    else
    {
        res.writeHead(404,responseHeaders);
        console.log(err)
        res.end(JSON.stringify({message:err})) 
    }

}

const middlewareSalidaOk = (req,res,next) =>{
    console.log("Salida OK");
    console.log(res.statusCode)
    res.writeHead(200,responseHeaders);
    console.log(res.body)
    res.end(JSON.stringify(res.body))
}

app.use(middlewareEntrada);

app.options('/*', (req,res,next) =>{
    console.log("opt")
    next();
})

//SUCURSALES
app.get('/api/sucursales/:branchId', checkJwt, (request,response,next) => { //Sucursal en especifico
    
    sucursalesService.getMethod(request.url).then((res) => {
        response.body = res;
        next();
    }).catch((err) => {
        next(err)});

})

app.get('/api/sucursales', checkJwt, (request,response,next) => { //Todas las sucursales

    sucursalesService.getMethod(request.url).then((res) => {
        response.body = res;
        next();
    }).catch((err) => {
        next(err);
    });
})


//RESERVAS
app.get('/api/reservas/:idReserva', checkJwt, (request,response,next) => { //Get de una reserva en especifico

    reservasService.getMethod(request.url).then((res) => {
        response.body = res;
        next();
    }).catch((err) => {
        next(err);
    });
})

app.get('/api/reservas',checkJwt, (request,response,next) => { //Get reservas con filtros
    reservasService.getMethod(request.url).then((res) => {
        response.body = res;
        next();
    }).catch((err) => {
        next(err);
    });

})

app.delete('/api/reservas/:idReserva', checkJwt, (request,response,next) => { //Baja de una reserva
    reservasService.getMethod(request.url).then((res) => {
        response.body = res;
        next();
    }).catch((err) => {
        next(err);
    });

})

app.put('/api/reservas/solicitar/:idReserva', checkJwt, (request,response,next) => { //Solicitud de reserva
    reservasService.putMethod(request.url).then((res) => {
        response.body = res;
        next();
    }).catch((err) => {
        next(err);
    });   

})

app.put('/api/reservas/confirmar/:idReserva', checkJwt,  (request,response,next) => { //Confirmacion de una reserva
    reservasService.putMethod(request.url).then((res) => {
        response.body = res;
        next();
    }).catch((err) => {
        err.message = "No responde el servidor de reservas"
        next(err);
    });
})


app.use(middlewareSalida);
app.use(middlewareSalidaOk);



app.listen(enviroment_gatway_port,(e) => {  
    console.log("GATEWAY AUTH LEVANTADO EN PORT: " + enviroment_gatway_port)
});
