import {router} from '../js/router/index.router.js'
import { dataReserva } from './js/controllers/login/reservaTurnoLog.controller.js'
import { dataReservaInvitado } from './js/controllers/invitado/reservaInvitado.controller.js'
let base_url = 'http://127.0.0.1:5500/SistemaTurnos/Frontend/html/';


let dataFinal=null;

window.addEventListener('hashchange', (ev) => {
    console.log(ev.target.location.hash)
    if(ev.target.location.hash == '#/consultafechainvitado')
        if(dataReserva)
            dataFinal = dataReserva;
        if(dataReservaInvitado)
            dataFinal = dataReservaInvitado;
    router(dataFinal,ev.target.location.hash)

})


if(window.location.hash === '')
    window.location.hash = '#/login'

//deberia chequear antes 
router(null,window.location.hash);
    //SPA





