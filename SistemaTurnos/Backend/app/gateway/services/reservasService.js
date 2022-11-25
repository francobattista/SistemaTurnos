const http = require('http');
const env = require('dotenv')

env.config();

const enviroment_reservas_port = process.env.RESERVAS_PORT //|| '8080' ;
const enviroment_reservas_path = process.env.RESERVAS_PATH //|| 'http://localhost:';


const requestHost = '127.0.0.1'; //Usado asi porque es distinto el request que el get
//const requestPort = ;

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
        console.log(enviroment_reservas_path)
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

const postMethod = (endpoint,body) => {
    return new Promise((resolve,reject) => {
        console.log("PATH + PORT")
        console.log(enviroment_reservas_path + enviroment_reservas_port )
        console.log(endpoint)
        const options = {
            port: enviroment_reservas_port,
            hostname: requestHost, //Se deja asi, ya que el que esta en env tiene problema por los : finales
            method: 'POST',
            path: endpoint,
            headers:
            {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body)
            }
          };
          console.log("aaaaa")
        const request = http.request(options,(response)=>{
            let respuesta;
            console.log("ress")
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
        console.log(body)
        request.write(body);
        request.on('error', (err) => {console.log(err);reject('ERROR: el servidor de reservas no responde' + err)})
        request.end()
    }) 
}

module.exports = {getMethod : getMethod,
    postMethod: postMethod}