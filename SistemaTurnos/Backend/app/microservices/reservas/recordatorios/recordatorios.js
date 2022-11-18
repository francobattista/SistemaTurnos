
const reservasNotificationService = require('./../reservasNotificationsService.js')

//const a = new Date()

//console.log(a.getTime()/1000 - 86400000/1000)


let timeouts = new Array();

const createRecordatorio = (datosRecordatorio, reservaDate) =>{
  return new Promise((res,rej) => {
    const today = new Date();
    console.log(reservaDate.getTime())
    const diferencia = reservaDate.getTime() - today.getTime();

    let cuandoAviso = (reservaDate.getTime() - 24*3600*1000) - today.getTime(); //cuando le tengo q avisar

    let timeout;

    console.log("datosRecordatorio",datosRecordatorio)
    console.log("dif",diferencia);
    console.log("cuandoAviso", cuandoAviso);
    console.log(datosRecordatorio.userId)
    if(diferencia > 24*3600*1000) //Si la dif fue mayor a 24 hs
      if(datosRecordatorio.userId != 0)
        timeout[datosRecordatorio.userId] = (setTimeout(() => {
          console.log("recordar")
          reservasNotificationService.createNotification(datosRecordatorio.email, 'RECORDATORIO DE TURNO',`Mi loko, recorda que dentro de 24hs tenes turno en el #PotreroDeCoccaro `)
        },cuandoAviso));  
      else
      {
        setTimeout(() => {
          console.log("recor")
          reservasNotificationService.createNotification(datosRecordatorio.email, 'RECORDATORIO DE TURNO',`Mi loko, recorda que dentro de 24hs tenes turno en el #PotreroDeCoccaro `)
        },cuandoAviso);  
      }
    //no creo nada
      
    res();
  }).catch((err) => {console.log(err)})
}


const bajaRecordatorio = (datos) => {
  return new Promise((res,rej) => {

    if(datos.userId != 0)
      if(timeouts[datos.userId])
      {
      
        clearTimeout(timeouts[datos.userId]); //Si el usuario es distinto de 0 y tenia un recordatorio, que lo borre
      }


    //no creo nada
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