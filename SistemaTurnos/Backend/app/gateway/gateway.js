const http = require('http')

const url = require('url')


//Configuraciones del GATEWAY en archivo .env
const port = process.env.PORT || 3030
const host = process.env.HOST || '0.0.0.0'


const redirectRequest = (req) => {

    
    const pathname  = url.parse(req.url)
    console.log(pathname)


}


const server = http.createServer( (request,response) =>
{ 


    //const pathname  = url.parse(req.url)
    //console.log(pathname)
    if(request.url.substring('/api'))
        redirectRequest(request)

    request.on('data',(chunk) =>{
        body += chunk; 
    })

    request.on('end', () => {
        //console.log(request)
        response.end("Gateway responde")
    })


})

server.listen( port, (req,res) => {
    console.log(`GATEWAY: Levantado en puerto ${port}`)
} )


