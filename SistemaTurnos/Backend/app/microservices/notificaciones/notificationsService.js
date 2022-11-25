
const https = require('https');
const env = require('dotenv');

env.config();


const APIKEY = process.env.SENGDRID_API_KEY;

const requestHost = '127.0.0.1';

const confirmationEmail = (url,body) => {

  return new Promise((res,rej)=>{

    const postData = JSON.stringify({
      "personalizations": [
        {
          "to": [
            {
              "email": body.destinatario
            }
          ],
          "subject": body.asunto
        }
      ],
      "from": {
        "email": "elpotrerodecoccaro@gmail.com",
        "name": "El Potrero de Coccaro"
      },
      "content": [
        {
          "type": "text/html",
          "value": `<p>${body.cuerpo}</p>`
        }
      ]
    });
    
    const options = {
      hostname: 'api.sendgrid.com',
      path: '/v3/mail/send',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + APIKEY
      }
    };
    
    const req = https.request(options, (response) => {
    
      if(response.statusCode == 202 || response.statusCode == 200)
        res('Confirmacion enviada correctamente')
      else
        rej('ERROR en la confirmacion de mail')
      response.once('data', (data) => {
          respuesta = data.toString();
          console.log(respuesta)
      })
      response.once('error', (e) =>{
        rej('Error en la confirmacion del mail')
      })


    });
    
    req.on('error', (e) => {
      rej('Error en la peticion de confirmacion del mail')
      console.error(e);
    });
    
    req.write(postData);
    req.end();




  })


}


module.exports = { confirmationEmail: confirmationEmail }