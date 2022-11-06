const http = require('http');

const enviroment_port = process.env.SUCURSALES_PORT || '8090' ;
const enviroment_host = process.env.HOST || 'http://localhost:';



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
                reject('Error en la respuesta desde: ' + endpoint)
            })
        }).once('error', (err) => {reject("Error en la respuesta de: '" + endpoint)});
    })  
}

//METODO POST
//METODO DELETE
//METODO PUT

const postMethod = () => {}

const putMethod = () => {}

const deleteMethod = () => {}


module.exports = {getMethod : getMethod}