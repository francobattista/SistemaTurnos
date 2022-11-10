// import html from ... login.html

import {
  altaReserva,
  confirmaReserva,
} from "../../services/reservasService.js";

//Eso se puede hacer con webpack, y me ahorra tener que pasar las vistas como string aca, es decir, podria usar un arch html

export default (data) => {
  console.log(data);
  const view = `
    <h1 style="color:white;" id="h1Princ">El Potrero de Coccaro</h1>
    
    <input type="text" id="inputEmail" placeholder="Email">
    <dialog id="dialogConfirm">
        <p>CONFIRME SU TURNO: TIENE UN MINUTO PARA HACERLO</p>
        <div id="divBotonesConfirmacion">
            <button id="Ok" class="btnConfirmacion">OK</button>
            <button id="Cancel" class="btnConfirmacion">CANCELAR</button>
        </div>
    </dialog>
    <button id="btnBackF" class="btn btn-primary">ATRAS !</button>
    <h2 style="margin:20px;color:white;">TURNOS DISPONIBLES<h2>
    `;
  const divElement = document.createElement("div");
  divElement.innerHTML = view;

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

  const preparaFechas = (fecha) => {
    fecha.style["display"] = "flex";

    fecha.style["justify-content"] = "center";

    fecha.style["margin"] = "5px";

    fecha.style["font-size"] = "50px";

    fecha.style["background-color"] = "white"
    fecha.addEventListener("click", (event) => {
      if (inputEmail.value && event.target.body.idReserva) {
        altaReserva(event.target.body.idReserva, inputEmail.value, 0)
          .then((res) => {
            createDialog();
            dialog.addEventListener("close", (r) => {
              if (Number(dialog.returnValue)) {
                confirmaReserva(
                  event.target.body.idReserva,
                  inputEmail.value,
                  0
                )
                  .then((r) => {
                    alert("Reserva confirmada con exito!");
                  })
                  .catch((e) => alert("Error en la confirmacion de turno!"));
              } else {
              }
              window.location.hash = "#/reservainvitado";
            });
          })
          .catch((err) => {
            console.log(err);
            alert("No se pudo reservar");
          });
      } else alert("parametros incorrectos");
    });

    fecha.addEventListener("mouseover", (event) => {
      fecha.style["background-color"] = "#7ca3b9";
      fecha.style["border-radius"] = "10px";
    });
    fecha.addEventListener("mouseout", (event) => {
      fecha.style["background-color"] = "white";
    });
  };

  const formateaFechas = (fecha) => {
    return new Date(fecha).toLocaleTimeString();
  };

  const backBtnF = divElement.querySelector("#btnBackF");
  backBtnF.addEventListener("click", () => {
    window.location.hash = "#/reservainvitado";
  });
  const inputEmail = divElement.querySelector("#inputEmail");
  const horariosReserva = document.createElement("div");
  divElement.appendChild(horariosReserva);
  if (data) {
    const h3 = document.createElement("h3");

    const f = new Date(data[0].dateTime);
    console.log(f.toLocaleDateString());
    h3.innerHTML = "FECHA SELECCIONADA: " + f.toLocaleDateString();
    h3.style["margin"] = "20px";
    h3.style["color"]="white"
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
    window.location.hash = "#/reservainvitado";
  }

  return divElement;
};
