
const reservasNotificationService = require('./../reservasNotificationsService.js')


let timeouts = new Map();


const createRecordatorio = (datosRecordatorio, reservaDate) =>{
  return new Promise((res,rej) => {
    const today = new Date();
    const diferencia = reservaDate.getTime() - today.getTime();

    
    console.log("DIA DE RESERVA");
    let reservaD = new Date();
    console.log(reservaDate);
    console.log(reservaDate.getTime());
    
    console.log("DIFERENCIA");
    console.log(diferencia)
    let cuandoAviso = (reservaDate.getTime() - 24*3600*1000) - today.getTime(); //cuando le tengo q avisar
    if(diferencia > 24*3600*1000) //Si la dif fue mayor a 24 hs
    {
      if(datosRecordatorio.userId != 0)
      {
        timeouts.set(Number(datosRecordatorio.userId), (setTimeout(() => {
          reservasNotificationService.createNotification(datosRecordatorio.email, 'RECORDATORIO DE TURNO',`Mi loko, recorda que dentro de 24hs tenes turno en el #PotreroDeCoccaro `)
        },cuandoAviso)) );
      }
      else
      {
        console.log("DATOS DEL RECORDATORIO: ");
        console.log(datosRecordatorio)
        setTimeout(() => {
          reservasNotificationService.createNotification(datosRecordatorio.email, 'RECORDATORIO DE TURNO',`Mi loko, recorda que dentro de 24hs tenes turno en el #PotreroDeCoccaro `)
        },cuandoAviso);  
      }
    }
    //no creo nada
      
    res();
  }).catch((err) => {console.log(err)})
}


const bajaRecordatorio = (datos) => {
  return new Promise((res,rej) => {
    if(datos.userId != 0)
      if(timeouts.get(Number(datos.userId)))
        clearTimeout(timeouts.get(Number(datos.userId))); //Si el usuario es distinto de 0 y tenia un recordatorio, que lo borre
      

    res();
  }).catch((err) => {console.log(err)})
}



module.exports = { createRecordatorio:createRecordatorio, bajaRecordatorio: bajaRecordatorio }




//24 hs ->  86400000 milisegundos -> si al dia le resto estos ms, entonces me da como resultado, el momento q tengo q mandar el mail
//https://timestamp.online/
//API https://docs.sendgrid.com/for-developers/sending-email/scheduling-email#2-api

//Endpoint para programarlos:
//https://api.sendgrid.com/v3/mail/send

//Body
/*
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
      ], 
       
    "send_at":{
        
    }
    });
*/



//Enpoint para cancelarlos:

//