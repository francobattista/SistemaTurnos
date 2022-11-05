// import html from ... login.html

import { altaReserva,confirmaReserva } from "../services/reservasService.js";

//Eso se puede hacer con webpack, y me ahorra tener que pasar las vistas como string aca, es decir, podria usar un arch html


export default (data) => {


    console.log(data)
    const view = `
        <button id="btnBackF">ATRAS!</button>
        <input type="text" id="inputEmail">
        <dialog id="dialogConfirm">
        <p>CONFIRME SU TURNO</p>
        <button id="Ok">OK</button>
        <button id="Cancel">CANCELAR</button>
        </dialog>
    `;
    const divElement = document.createElement("div");
    divElement.innerHTML = view;
    

    const dialog = divElement.querySelector("#dialogConfirm");

    const createDialog = () => {
        dialog.showModal()
    }
    const closeDialog = (res) => {
        dialog.close(res);
    }

    divElement.querySelector("#Ok").addEventListener(('click'), () => {
        closeDialog(1);
    })
    divElement.querySelector("#Cancel").addEventListener(('click'), () => {
        closeDialog(0);
    })


    const preparaFechas = (fecha) =>{

        fecha.addEventListener('click', (event) => {
            console.log(event)
            if(inputEmail.value && event.target.body.idReserva)
            {
                altaReserva(event.target.body.idReserva,inputEmail.value,0).then((res)=>{
                    createDialog();
                    dialog.addEventListener(('close'),(r) => {
                        if(Number(dialog.returnValue))
                        {
                            confirmaReserva(event.target.body.idReserva,inputEmail.value,0).then((r) => {
                                console.log(r)
                            })
                        }
                        else
                        {
                            
                        }
                    })
                }).catch((err) => {console.log(err); alert("No se pudo reservar")})
            }
            else
                alert("parametros incorrectos")
        })

        fecha.addEventListener('mouseover', (event) => {
            fecha.style['background-color'] = "#7ca3b9";
            fecha.style['border-radius'] = "10px";
        })
        fecha.addEventListener('mouseout', (event) => {
            fecha.style['background-color'] = "white";
        })
    }

    const formateaFechas = (fecha) =>{
        return new Date(fecha).toLocaleTimeString();
    }

    const backBtnF = divElement.querySelector('#btnBackF');
    backBtnF.addEventListener('click',() => {
        window.location.hash = '#/reservainvitado';
    })
    const inputEmail = divElement.querySelector('#inputEmail');
    const horariosReserva = document.createElement("div");
    divElement.appendChild(horariosReserva)
    data.forEach(element => {
        const fecha = document.createElement("div")
        const date = formateaFechas(element.dateTime);
        fecha.innerHTML = date;
        fecha.style = ""
        fecha.body = element;
        preparaFechas(fecha);
        horariosReserva.appendChild(fecha);
    });

  
    return divElement;
  };