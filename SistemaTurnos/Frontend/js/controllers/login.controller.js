// import html from ... login.html

//Eso se puede hacer con webpack, y me ahorra tener que pasar las vistas como string aca, es decir, podria usar un arch html
import { createAuthClient } from "../services/auth.service.js";

export default () => {
    const view = `


    <div class="container login-container" style=" display: flex;width: 100%; height: 100%;">
      <div class="row" style="width: 100%; justify-content: center">
          <div style="background-color:white;" class="col-md-6 login-form-1">
              <h3>El Potrero de Coccaro</h3>
              <form id="form">
                  <div class="form-group">
                      <input id="login" type="text" class="form-control" placeholder="Your Email *" value="" />
                  </div>
                  <div class="form-group">
                      <input type="password" class="form-control" placeholder="Your Password *" value="" />
                  </div>
                  <div id="btns" class="form-group">
                      <input type="button" id="btnLogin" class="btnSubmit" value="Login" />

                      <input type="button" class="btnRegister" value="Register" />

                      <input type="button" id="btnInvitado" class="btnInvitado" value="INVITADO"/>

                  </div>
                  <div class="form-group">
                      <a href="#" class="ForgetPwd">Forget Password?</a>
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