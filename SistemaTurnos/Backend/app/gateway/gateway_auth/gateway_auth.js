// DUDAS -> Los metodos que no requieren autenticacion de token, tambien hay que meterlos aca? por ejemplo el alta de reserva puede hacerse con
// o sin token. O la idea es duplicar el api y que ahora siempre q el usuario este logueado se apunte aca?

//TODOS ESTOS RECURSOS RECIBEN EL TOKEN Y LO VALIDA


const env = require('dotenv');
const express = require('express');
const app = express();
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

const responseHeaders = {
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
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
    console.log("entrada");
    next();
}

const middlewareSalida = (err,req,res,next) =>{
    console.log(err.status);
    res.writeHead(err.status,responseHeaders);
    res.end(JSON.stringify({message:"error (por ahi por no autorizado, o por ahi pq le pinto jeje)"}))
}

app.use(middlewareEntrada);


//SUCURSALES
app.get('/api/sucursales/:branchId', checkJwt, (request,response) => { //Sucursal en especifico
    response.writeHead(responseHeaders);
    response.status(200).json({
        message: 'Pediste las sucursales, logeado correctamente!'
    })
})

app.get('/api/sucursales', checkJwt, (request,response) => { //Todas las sucursales
    console.log(request.headers)
    response.writeHead(200,responseHeaders);
    response.end(JSON.stringify({message: 'Pediste las sucursales, logeado correctamente!'}));

})

//NOTIFICACIONES
app.post('/api/notificacion', checkJwt, (request,response) => { //Envia notificacion

})

//RESERVAS
app.get('/api/reservas/:idReserva', checkJwt, (request,response) => { //Get de una reserva en especifico

})

app.get('/api/reservas',checkJwt, (request,response) => { //Get reservas con filtros

})

app.delete('/api/reservas/:idReserva', checkJwt, (request,response) => { //Baja de una reserva
   

})

app.put('/api/reservas/solicitar/:idReserva', checkJwt, (request,response) => { //Solicitud de reserva
   

})

app.put('/api/reservas/confirmar/:idReserva', checkJwt,  (request,response) => { //Confirmacion de una reserva
   

})


app.use(middlewareSalida);

/*
//LOGIN
app.post('/api/signup', (request,response) => { //Confirmacion de una reserva
    
    authController
})

app.post('/api/login', (request,response) => { //Confirmacion de una reserva

    
    const user = authController.findUser();
    const matchPassword = authController.comparePassword();

    if(!user || !matchPassword) createErrorResponse(response,'ERROR: usuario o contraseña incorrecto')

    const data = {
        token:''
    }
    createOkResponse(response,data)
})

*/

//RUTAS


app.listen(enviroment_gatway_port,(e) => {  
    console.log("GATEWAY AUTH LEVANTADO EN PORT: " + enviroment_gatway_port)
});


const createErrorResponse = (response,message) => {
    response.status(404).json({message:message});
}

const createOkResponse = (response,data) => {
    response.status(200).json(data);
}