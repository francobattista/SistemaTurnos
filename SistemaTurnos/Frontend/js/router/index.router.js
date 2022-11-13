import { pages } from "../controllers/index.controller.js";

let content = document.getElementById('root')

const router = (data,route) => { //Recibe data y una ruta a donde debe direccionarse


   //Chequeo si puede ingresar a la ruta.
   console.log(data)
   if(route != '#/login' && route != '#/reservaInvitado') //Estas son rutas que no necesitan ser validadas, cualquier usuario las puede acceder
      console.log("no tiene que validar")
   else
   {
      
   }
      //if(!validaRutas()) Si da falso, no pudo validar las rutas, entonces te manda al login
      //{
      //   window.location.hash = '/#/login'
      //   return;
      //}
   console.log(route)
   content.innerHTML='';
   switch(route){
      case '#/login': return content.appendChild(pages.login());
      case '#/consultafechainvitado' : return content.append(pages.fechasinvitado(data))
      case '#/consultafechalog' : return content.append(pages.fechasLog(data))
      case '#/reservaturnoslog' :content.append(pages.navbar()); return content.append(pages.reservaTurnoLog())
      case '#/home' : content.append(pages.navbar()); return content.append(pages.home())
      case '#/reservainvitado' : content.append(pages.home()); return content.append(pages.reservaInvitado())
      case '#/misturnos':  content.append(pages.navbar()); return content.append(pages.misturnos())
      default: return content.innerHTML='404 not found';
      //case '#login': return content.appendChild(Login());
      
   }


}

export {router}