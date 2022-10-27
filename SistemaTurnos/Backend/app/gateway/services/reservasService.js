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
    console.log(enviroment_host + enviroment_port +  endpoint)
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
const putMethod = (endpoint,body) => {
    console.log("por hacer el put!")
    console.log(enviroment_host + enviroment_port +  endpoint)
    return new Promise((resolve,reject) => {

        console.log(body)
        const options = {
            port: 8080,
            hostname: '127.0.0.1',
            method: 'PUT',
            path: endpoint,
            headers:{
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body)
            }
          };

          console.log("por hacer el put!")
        const r = http.request(options,(response)=>{
        
            console.log("aca!")
            response.once('data', (data) => {
                console.log("aca!")
                respuesta = data.toString();
                resolve(respuesta)
            })
            response.once('error', () =>{
                console.log("aca!")
                reject()
            })
        });
        r.write(body);
        r.on('error', (e) => console.log(e))
        r.end()
    })  
}
/*
const getTurnosLibresSucursales = (res,h) => { //Todos los turnos (disponibles o no) vinculados a esa sucursal
    console.log(enviroment_port)
    return http.get(enviroment_url + enviroment_port).once('response', (response) => 
    {
        response.once('data', (data) => {
            respuesta = data.toString();

            res.writeHead(200,headers)

            res.end(JSON.stringify(respuesta))
        })
    });
}

const getTurnosOcupadosSucursales = (res,h) => {
    console.log(enviroment_port)
    return http.get(enviroment_url + enviroment_port).once('response', (response) => 
    {
        response.once('data', (data) => {
            respuesta = data.toString();

            res.writeHead(200,headers)

            res.end(JSON.stringify(respuesta))
        })
    });
}

const getTurnosPorUsuario = (res,h) => { //Los que tenga reservado ese usuario
    console.log(enviroment_port)
    return http.get(enviroment_url + enviroment_port).once('response', (response) => 
    {
        response.once('data', (data) => {
            respuesta = data.toString();

            res.writeHead(200,headers)

            res.end(JSON.stringify(respuesta))
        })
    });
}

const getReservasSucursal = (res,heads,path) => {//Duda, aca puedo obviar la aprte de /sucursales/api?

    return http.get(enviroment_url + enviroment_port + path).once('response', (response) => 
    {
        response.once('data', (data) => {
            respuesta = data.toString();

            res.writeHead(200,headers)
            
            res.end(JSON.stringify(respuesta))
        })
    });

}*/

module.exports = {getMethod : getMethod,
    putMethod: putMethod}