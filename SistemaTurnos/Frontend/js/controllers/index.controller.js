import Login from "./login.controller.js"
import FechasInvitado from "./invitado/fechasinvitado.controller.js"
import TurnosLog from "./login/reservaTurnoLog.controller.js"
import Home from "./home.controller.js"
import ReservaInvitado from "./invitado/reservaInvitado.controller.js"
import NavBar from "./navbar.controller.js"
import MisTurnos from "./misturnos.controller.js"

const pages ={

    login : Login,
    fechasinvitado: FechasInvitado,
    reservaTurnoLog: TurnosLog,
    home : Home,
    reservaInvitado : ReservaInvitado,
    navbar : NavBar,
    misturnos: MisTurnos
}


export {pages}