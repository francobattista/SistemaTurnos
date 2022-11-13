import { createAuthClientLogOut } from "../services/auth.service.js";

export default () => {
    const view = `
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
        </a>
        
        <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0" id="lista">
        <li><a href="#/home" class="nav-link px-2 link-secondary">Inicio</a></li>
        <li><a href="#/misturnos" class="nav-link px-2 link-dark">Mis turnos</a></li>
        <li><a href="#/reservaturnoslog" class="nav-link px-2 link-dark">Reserva</a></li>
        </ul>
        
        <div id="btns" class="form-group">
            <input type="button" id="btnLogout" value="LOGOUT" />
        </div>
        <div class="col-md-3 text-end">

        </div>
    </header>
    `;
    const divElement = document.createElement("div");
    divElement.innerHTML = view;


    createAuthClientLogOut(divElement)

    return divElement;
}