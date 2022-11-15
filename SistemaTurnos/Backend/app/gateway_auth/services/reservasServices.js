const http = require('http');

const enviroment_reservas_port = process.env.RESERVAS_PORT || '8080' ;
const enviroment_reservas_path = process.env.RESERVAS_PATH || 'http://localhost:';



const putHeader = {
    'Content-Type':'application/json'
}

const getHeader = {
    
}

const postHeader = {}

const deleteHeader = {}
//METODO GET

const getMethod = (endpoint) => {
    return new Promise((resolve,reject) => {
        http.get(enviroment_reservas_path + enviroment_reservas_port + endpoint).once('response', (response) => 
        {
            response.once('data', (data) => {
                respuesta = data.toString();
                if(response.statusCode == 200)
                    resolve(respuesta)
                else
                    reject(respuesta)
            })
            response.once('error', () =>{
                reject('ERROR: en la respuesta del server de reservas')
            })
        }).once('error', (err) => { reject("ERROR: no responde el servidor de reservas")});
    }) 
}

//METODO POST
//METODO DELETE

//METODO PUT

const putMethod = (endpoint,body) => {
    return new Promise((resolve,reject) => {
        const options = {
            port: enviroment_reservas_port,
            hostname: '127.0.0.1',
            method: 'PUT',
            path: endpoint,
            headers:
            {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body)
            }
          };

        const request = http.request(options,(response)=>{

            response.once('data', (data) => {
                respuesta = data.toString();
                if(response.statusCode == 200)
                    resolve(respuesta)
                else
                    reject(respuesta)
            })
            response.once('error', (err) =>{
                reject('ERROR: en la respuesta del server de reservas')
            })
        });

        request.write(body);
        request.on('error', (err) => reject('ERROR: el servidor de reservas no responde' + err))
        request.end()
    }) 
}

module.exports = {getMethod : getMethod,
    putMethod: putMethod}