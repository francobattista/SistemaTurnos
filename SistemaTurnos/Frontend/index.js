import { router } from './js/router/index.router.js';
import { dataReservaLog } from './js/controllers/login/reservaTurnoLog.controller.js'
import { dataReservaInvitado } from './js/controllers/invitado/reservaInvitado.controller.js'


let dataFinal=null;

window.addEventListener('hashchange', (ev) => {

    console.log("La direccion cambio")
    if(ev.target.location.hash == '#/consultafechainvitado')
    {
        if(dataReservaInvitado)
            dataFinal = dataReservaInvitado;
    }
    else if(ev.target.location.hash == '#/consultafechalog')
    {
        if(dataReservaLog)
            dataFinal = dataReservaLog;
    }
    router(dataFinal,ev.target.location.hash)

})

//console.log(document.getElementById('cancion').autoPlay);
if(window.location.hash === '')
     window.location.hash = '#/login'

//deberia chequear antes 
router(null,window.location.hash);
    //SPA





