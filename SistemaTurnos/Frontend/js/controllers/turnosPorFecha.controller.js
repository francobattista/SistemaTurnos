// import html from ... login.html

//Eso se puede hacer con webpack, y me ahorra tener que pasar las vistas como string aca, es decir, podria usar un arch html

import { getTurnosByParam } from "../services/reservasService.js";

export default () => {
    const view = `

    
            <div class="calendar">
              <div class="calendar__info">
                  <div class="calendar__prev" id="prev-month">&#9664;</div>
                  <div class="calendar__month" id="month"></div>
                  <div class="calendar__year" id="year"></div>
                  <div class="calendar__next" id="next-month">&#9654;</div>
              </div>
          
              <div class="calendar__week">
                  <div class="calendar__day calendar__item">Lun</div>
                  <div class="calendar__day calendar__item">Mar</div>
                  <div class="calendar__day calendar__item">Mie</div>
                  <div class="calendar__day calendar__item">Jue</div>
                  <div class="calendar__day calendar__item">Vie</div>
                  <div class="calendar__day calendar__item">Sab</div>
                  <div class="calendar__day calendar__item">Dom</div>
              </div>
          
              <div class="calendar__dates" id="fechas"></div>
            </div>
        `;

        const divElement = document.createElement("div");
        divElement.innerHTML = view;

        return divElement;
};