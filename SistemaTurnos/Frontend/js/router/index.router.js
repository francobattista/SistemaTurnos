import { pages } from "../controllers/index.controller.js";

let content = document.getElementById('root'); //Elemento ROOT : Donde se dibuja y desdibujan los elementos

const router = (data,route) => { 

   //Router principal: Siempre que hay un cambio de ruta, llega aca.

   if(route != '#/login' && route != '#/reservaInvitado') //Estas son rutas que no necesitan ser validadas, cualquier usuario las puede acceder
      console.log("no tiene que validar")


   console.log(route)
   content.innerHTML=''; //Limpia el content.
   
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