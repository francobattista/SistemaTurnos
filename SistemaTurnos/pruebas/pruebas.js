const http = require('http');


sv = http.createServer((req,res) => {

    res.end("joya")
})


sv.listen(3000, () => { });

const options = {
    hostname: '127.0.0.1',
    port:8080,
    path:'api/reserva/1',
    method: 'GET',

  };

const req = http.request(options,(response) => 
    {
        console.log(response)
        response.once('data', (data) => {
            console.log("aca!")
            respuesta = data.toString();
            console.log(respuesta)
            console.log("a")
        })
        response.once('error', () =>{
            console.log("aca!")
        })
    }
)

req.on('error', () => {})

req.end()