const http = require('http')


const server = http.createServer( (request,response) =>{

    request.on('data',(chunk) =>{
        body += chunk; 
    })

    request.on('end', () => {
        console.log(request)
        response.end("RESPUESTA")
    })


})

server.listen( 8080, (req,res) => {
    console.log("Server levantado")
} )