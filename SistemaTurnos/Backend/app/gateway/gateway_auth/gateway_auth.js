// DUDAS -> Los metodos que no requieren autenticacion de token, tambien hay que meterlos aca? por ejemplo el alta de reserva puede hacerse con
// o sin token. O la idea es duplicar el api y que ahora siempre q el usuario este logueado se apunte aca?

//TODOS ESTOS RECURSOS RECIBEN EL TOKEN Y LO VALIDA
const enviroment_gatway_host = process.env.GATEWAY_AUTH_HOST;
const enviroment_gatway_port = process.env.GATEWAY_AUTH_PORT;

const env = require('dotenv');
const express = require('express');
const { json } = require('express/lib/response');

env.config();

const app = express();

app.set('name','ElPotreroDeCoccaro')

const login = (req,res,next) => //VALIDACION DEL JWT CON AUTH0
{

    
    authController.validaToken();

    console.log("login")
    //if req.url == login o singin que los mande directo y que no valide token pq justamente se estan lgoenadp
    if(true) 
        next();
}

app.use(json())

app.use(login)

//SUCURSALES
app.get('/api/sucursales/:branchId', (request,response) => { //Sucursal en especifico
    

})

app.get('/api/sucursales', (request,response) => { //Todas las sucursales

})

//NOTIFICACIONES
app.post('/api/notificacion', (request,response) => { //Envia notificacion

})

//RESERVAS
app.get('/api/reservas/:idReserva', (request,response) => { //Get de una reserva en especifico

})

app.get('/api/reservas', (request,response) => { //Get reservas con filtros

})

app.delete('/api/reservas/:idReserva', (request,response) => { //Baja de una reserva
   

})

app.put('/api/reservas/solicitar/:idReserva', (request,response) => { //Solicitud de reserva
   

})

app.put('/api/reservas/confirmar/:idReserva', (request,response) => { //Confirmacion de una reserva
   

})



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