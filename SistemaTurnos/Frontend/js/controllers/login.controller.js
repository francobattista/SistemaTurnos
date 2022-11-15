// import html from ... login.html

//Eso se puede hacer con webpack, y me ahorra tener que pasar las vistas como string aca, es decir, podria usar un arch html
import { createAuthClient } from "../services/auth.service.js";

export default () => {
    const view = `


    <div class="container login-container" style=" display: flex;width: 100%; height: 100%;">
      <div class="row" style="width: 100%; justify-content: center">
          <div style="background-color:white;" id="loginCuadro" class="col-md-6 login-form-1">
              <h3>El Potrero de Coccaro</h3>
              <form id="form">
                  <div id="btns" class="form-group">
                      <input type="button" id="btnLogin" class="btnStyle" value="LOGIN" />
                      <input type="button" id="btnInvitado" class="btnStyle" value="INVITADO"/>
                  </div>
              </form>
          </div>
        </div>
      </div>
    `;
    const divElement = document.createElement("div");
    divElement.innerHTML = view;

    createAuthClient(divElement);

    const btnInvitado = divElement.querySelector("#btnInvitado");
    btnInvitado.addEventListener("click", () => {
      console.log(window.location.hash)
      window.location.hash = '#/reservainvitado';
      console.log(window.location.href)
    });

   /* const btnSubmit = divElement.querySelector("#btnSubmit");
      btnSubmit.addEventListener(('click'), () => {
    })*/

    //const btnRegister = divElement.querySelector("#btnRegister");

    //btnRegister.addEventListener(('click'),() => {

    //})

  
    return divElement;
  };