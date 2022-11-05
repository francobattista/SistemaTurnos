const http = require('http');

const enviroment_port = process.env.RESERVAS_PORT || '8080' ;
const enviroment_host = process.env.HOST || 'http://localhost:';



const putHeader = {
    'Content-Type':'application/json'
}

const getHeader = {}

const postHeader = {}

const deleteHeader = {}
//METODO GET

const getMethod = (endpoint) => {
    console.log("GET METHOD")
    return new Promise((resolve,reject) => {
        console.log("GET METHOD")
        http.get(enviroment_host + enviroment_port + endpoint).once('response', (response) => 
        {
            console.log("GET METHOD")
            response.once('data', (data) => {
                console.log("respuesta?")
                respuesta = data.toString();
                resolve(respuesta)
            })
            response.once('error', () =>{
                console.log("respuesta?")
                reject('Error en la respuesta del server de reservas')
            })
        });
    }).catch((err)=>{console.log('Error en getMethod '+ err)})  
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
            headers:{
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body)
            }
          };

        const request = http.request(options,(response)=>{
            response.once('data', (data) => {
                respuesta = data.toString();
                resolve(respuesta)
            })
            response.once('error', () =>{
                reject('Error en la respuesta del server de reservas')
            })
        });

        request.write(body);
        request.on('error', (err) => reject('Error en el put de reservas ' + err))
        request.end()
    }).catch((err) => {console.log('Error en el put de reservas ' + err)})  
}

module.exports = {getMethod : getMethod,
    putMethod: putMethod}