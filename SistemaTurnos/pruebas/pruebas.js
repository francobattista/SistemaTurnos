/*const http = require('http');

var postData = {
    "personalizations": [
      {
        "to": [
          {
            "email": "santiesca99@gmail.com"
          }
        ],
        "subject": "YOUR SUBJECT LINE GOES HERE"
      }
    ],
    "from": {
      "email": "elpotrerodecoccaro@gmail.com",
      "name": "Example Order Confirmation"
    },
    "content": [
      {
        "type": "text/html",
        "value": "<p>Hello from Twilio SendGrid!</p>"
      }
    ]
  };
  
const options = {
    hostname: 'api.sendgrid.com',
    path: '/v3/mail/send',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    }
  };

const req = http.request(options,(response) => 
    {
        
        response.once('data', (data) => {

            respuesta = data.toString();
            console.log(respuesta)

        })
        response.once('error', (e) =>{
            console.log(e)
            console.log("aca!")
        })
    }
)

    req.write(JSON.stringify(postData));
    req.on('error', (e) => {console.log(e)})
    req.end()

    */
    const https = require('https');

    var postData = {
      "personalizations": [
        {
          "to": [
            {
              "email": "santiesca99@hotmail.com"
            }
          ],
          "subject": "YOUR SUBJECT LINE GOES HERE"
        }
      ],
      "from": {
        "email": "elpotrerodecoccaro@gmail.com",
        "name": "Santiago Escalante"
      },
      "content": [
        {
          "type": "text/html",
          "value": "<p>Hello from Twilio SendGrid!</p>"
        }
      ]
    };
    
    postData = JSON.stringify(postData);
    
    var options = {
      hostname: 'api.sendgrid.com',
      path: '/v3/mail/send',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      }
    };
    
    var req = https.request(options, (res) => {
      console.log('statusCode:', res.statusCode);
      console.log('headers:', res.headers);
    
      res.on('data', (d) => {
        console.log('hola')
        //process.stdout.write(d);
      });
    });
    
    req.on('error', (e) => {
      console.error(e);
    });
    
    req.write(postData);
    req.end();