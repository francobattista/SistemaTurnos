const http = require('http');

const enviroment_port = process.env.RESERVAS_PORT || '8080' ;
const enviroment_host = process.env.HOST || 'http://localhost:';



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
        http.get(enviroment_host + enviroment_port + endpoint).once('response', (response) => 
        {

            response.once('data', (data) => {
                respuesta = data.toString();
                if(response.statusCode == 404)
                    reject(respuesta)
                else
                    resolve(respuesta)
            })
            response.once('error', () =>{
                reject('Error en la respuesta del server de reservas')
            })
        });
    })  
}

//METODO POST
//METODO DELETE

//METODO PUT

const putMethod = (endpoint,body) => {
    return new Promise((resolve,reject) => {
        const options = {
            port: enviroment_port,
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
                if(response.statusCode == 404)
                    reject(respuesta)
                else
                    resolve(respuesta)
            })
            response.once('error', () =>{
                reject('Error en la respuesta del server de reservas')
            })
        });

        request.write(body);
        request.on('error', (err) => reject('Error en el put de reservas ' + err))
        request.end()
    }) 
}

module.exports = {getMethod : getMethod,
    putMethod: putMethod}