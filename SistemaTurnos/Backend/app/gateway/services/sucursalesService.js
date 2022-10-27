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
                resolve(respuesta)
            })
            response.once('error', () =>{
                reject()
            })
        });
    })  
}

//METODO POST
//METODO DELETE
//METODO PUT

const postMethod = () => {}



const putMethod = () => {}


const deleteMethod = () => {}

/*
const getSucursales = () => {
    return new Promise((resolve,reject) => {
        http.get(enviroment_host + enviroment_port + '/api/sucursales/' ).once('response', (response) => 
        {
            response.once('data', (data) => {
                respuesta = data.toString();
                resolve(respuesta)
            })
            response.once('error', () =>{
                reject()
            })
        });
    })     
}

const getSucursal = (heads,idSucursal) => {//Duda, aca puedo obviar la aprte de /sucursales/api?
    return new Promise((resolve,reject) => {
    http.get(enviroment_host + enviroment_port + '/api/sucursales/' + idSucursal).once('response', (response) => 
    {
        response.once('data', (data) => {
            respuesta = data.toString();
            resolve(respuesta)
        })
        response.once('error', () =>{
            reject()
        })
    });
})

}
*/

module.exports = {getMethod : getMethod}