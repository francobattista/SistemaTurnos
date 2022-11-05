const http = require('http')
const env = require('dotenv')

env.config();

const portNotificaciones = process.env.portNotificaciones || 8070

//METODO GET
//METODO POST

const createNotification = (email,asunto,cuerpo) => {
    return new Promise((resolve,reject) => {
        console.log(email)
        const body = JSON.stringify({
            "destinatario": email,
            "asunto": asunto,
            "cuerpo": cuerpo
        })

        console.log("body en createNotifications")
        console.log(body)
        
        const options = {
            port: portNotificaciones,
            hostname: '127.0.0.1',
            method: 'POST',
            path: '/api/notificacion',
            headers:{
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body)
            }
          };
        console.log("antes del req")
        const request = http.request(options,(response)=>{
            response.once('data', (data) => {
                respuesta = data.toString();
                resolve(data.toString())
            })
            response.once('error', () =>{
                reject('Error en la respuesta del server de reservas')
            })
        });
        request.write(body);
        request.on('error', (err) => console.log('Error en el put de reservas ' + err))
        request.end()
    }).catch((err) => {console.log('Error en el POST DE NOTIFICACIONES ' + err)})  
}



module.exports = { createNotification:createNotification }