// import html from ... login.html

import {
    altaReservaAuth,
    confirmaReservaAuth,
  } from "../../services/reservasService.js";
  
  
  export default (data) => {
    const view = `
      <h1 style="color:white;" id="h1Princ">El Potrero de Coccaro</h1>
      
      <dialog id="dialogConfirm">
          <p>CONFIRME SU TURNO: TIENE UN MINUTO PARA HACERLO</p>
          <div id="divBotonesConfirmacion">
              <button id="Ok" class="btnConfirmacion">OK</button>
              <button id="Cancel" class="btnConfirmacion">CANCELAR</button>
          </div>
      </dialog>
      <button id="btnBackF" class="btn btn-primary">ATRAS !</button>
      <h2 style="margin:20px;color:white;  -webkit-text-stroke: 2px rgb(8, 191, 26);
      `;

    const divElement = document.createElement("div");
    divElement.innerHTML = view;
  

    //Componente--------------------------

    const userUnauthorized = () => {
      window.location.hash = '#/login'
    }

    //DIALOG y BOTONES DEL DOM
    const dialog = divElement.querySelector("#dialogConfirm");
  
    const createDialog = () => {
      dialog.showModal();
    };

    const closeDialog = (res) => {
      dialog.close(res);
    };
  
    divElement.querySelector("#Ok").addEventListener("click", () => {
      closeDialog(1);
    });
    divElement.querySelector("#Cancel").addEventListener("click", () => {
      closeDialog(0);
    });

    const backBtnF = divElement.querySelector("#btnBackF");
    backBtnF.addEventListener("click", () => {
      window.location.hash = "#/reservaturnoslog";
    });
    
    const inputEmail = divElement.querySelector("#inputEmail");



    const preparaFechas = (fecha) => {
      fecha.style["display"] = "flex";
      fecha.style["justify-content"] = "center";
      fecha.style["margin"] = "5px";
      fecha.style["font-size"] = "50px";
      fecha.style["background-color"] = "#dafa04";

      fecha.addEventListener("click", (event) => {
        if (event.target.body.idReserva) {
          altaReservaAuth(event.target.body.idReserva, sessionStorage.getItem('email'),sessionStorage.getItem('userId'))
            .then((res) => {//la resp no interesa mucho pq si no se pudo reservar trae codigo de error
              createDialog();
              dialog.addEventListener("close", (r) => {
                if (Number(dialog.returnValue)) 
                {
                  confirmaReservaAuth(event.target.body.idReserva,sessionStorage.getItem('email'),sessionStorage.getItem('userId')).then((r) => {
                      alert("Reserva confirmada con exito!");}).catch((err) => 
                      {
                        if(err.auth)
                            userUnauthorized();
                        else
                            alert("Error en la confirmacion")
                      });
                } else {
                }
                window.location.hash = "#/reservaturnoslog";
              });
            }).catch((err) => 
            {
              if(err.auth)
                  userUnauthorized();
              else
                  alert("Error en la reserva")
          });
        } else alert("parametros incorrectos");
      });
      

      //ESTILOS DE LAS FECHAS
      fecha.addEventListener("mouseover", (event) => {
        fecha.style["background-color"] = "rgb(8, 191, 26)";
        fecha.style["border-radius"] = "10px";
      });
      fecha.addEventListener("mouseout", (event) => {
        fecha.style["background-color"] = "#dafa04";
      });
    };
  



    
    const formateaFechas = (fecha) => {
      return new Date(fecha).toLocaleTimeString();
    };
  
    //CON LA DATA RECIBIDA DE OTRO COMPONENTE ARMO LAS FECHAS
    const horariosReserva = document.createElement("div");
    divElement.appendChild(horariosReserva);
    if (data) 
    {
      const h3 = document.createElement("h3");
      const f = new Date(data[0].dateTime);
      console.log(f.toLocaleDateString());
      h3.innerHTML = "FECHA SELECCIONADA: " + f.toLocaleDateString();
      h3.style["margin"] = "20px";
      h3.style["color"]="white"
      h3.style["-webkit-text-stroke"] = "2px rgb(8, 191, 26)";
      h3.style["text-shadow"] = "black 0.1em 0.1em 0.2em";
      divElement.appendChild(h3);
  
      data.forEach((element) => {
        const fecha = document.createElement("div");
        const date = formateaFechas(element.dateTime);
        fecha.innerHTML = date;
        fecha.style = "";
        fecha.body = element;
        preparaFechas(fecha);
        horariosReserva.appendChild(fecha);
      });
    } else {
      window.location.hash = "#/reservaturnoslog";
    }
  
    return divElement;
  };
  