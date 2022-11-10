const http = require('http');

const enviroment_sucursales_port = process.env.SUCURSALES_PORT || '8090' ;
const enviroment_sucursales_host = process.env.SUCURSALES_HOST || 'http://localhost:';



//METODO GET
const getMethod = (endpoint) => {
    return new Promise((resolve,reject) => {
        http.get(enviroment_sucursales_host + enviroment_sucursales_port + endpoint).once('response', (response) => 
        {
            response.once('data', (data) => {
                respuesta = data.toString();
                if(response.statusCode == 200)
                    resolve(respuesta)
                else
                    reject(respuesta)
            })
            response.once('error', () =>{
                reject('ERROR: en la respuesta desde: ' + endpoint)
            })
        }).once('error', (err) => {reject("ERROR: en la respuesta de: " + endpoint)});
    })  
}

//METODO POST
//METODO DELETE
//METODO PUT

const postMethod = () => {}

const putMethod = () => {}

const deleteMethod = () => {}


module.exports = {getMethod : getMethod}