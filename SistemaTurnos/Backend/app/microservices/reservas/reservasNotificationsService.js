const http = require('http')
const env = require('dotenv')

env.config();

const envirioment_port_reservas = process.env.RESERVAS_PORT || 8080
const envirioment_path_reservas = process.env.RESERVAS_PATH || '127.0.0.1'

const envirioment_port_notificaciones = process.env.NOTIFICACIONES_PORT || 8070
const envirioment_path_notificaciones = process.env.NOTIFICACIONES_PATH || '127.0.0.1'

const createNotification = (email,asunto,cuerpo) => {
    return new Promise((resolve,reject) => {
        console.log(email)
        const body = JSON.stringify({
            "destinatario": email,
            "asunto": asunto,
            "cuerpo": cuerpo
        })

        console.log(envirioment_path_notificaciones)
        
        const options = {
            port: envirioment_port_notificaciones,
            hostname: envirioment_path_notificaciones,
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