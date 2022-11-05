// import html from ... login.html

//Eso se puede hacer con webpack, y me ahorra tener que pasar las vistas como string aca, es decir, podria usar un arch html

import { getTurnosByParam } from "../services/reservasService.js";

export var dataReserva;

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




        //CALENDARIO

        let labelMeses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE','OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];

        let fechaDeHoy = new Date();
        fechaDeHoy.setHours(0)
        fechaDeHoy.setMinutes(0)
        fechaDeHoy.setSeconds(0)
        let fechaActual = new Date();
        let diaActual = fechaActual.getDate();
        let mesActualNumber = fechaActual.getMonth();
        let yearActual = fechaActual.getFullYear();
        let fechasHTML = divElement.querySelector('#fechas'); //agarra el div con todas las dates
        let mesHTML = divElement.querySelector('#month');
        let yearHTML = divElement.querySelector('#year');

        let prevButtonHTML = divElement.querySelector('#prev-month');
        let nextButtonHTML = divElement.querySelector('#next-month');

        mesHTML.textContent = labelMeses[mesActualNumber];
        yearHTML.textContent = yearActual.toString();



        //Listeners
        console.log(prevButtonHTML)
        prevButtonHTML.addEventListener('click', ()=>lastMonth());
        nextButtonHTML.addEventListener('click', ()=>nextMonth());

        const agregaListener = () =>
        {
            console.log(fechaDeHoy.getDay()-1)
            for(let index = fechaDeHoy.getDay()-1; index < fechasHTML.children.length; index++) {
                const element = fechasHTML.children[index];
                element.addEventListener('click', (event) => 
                {
                    let selectedDay = new Date(2022,mesActualNumber,Number(event.target.innerHTML))
                    //getReservas
                    getTurnosByParam('-1',selectedDay.toISOString(),3).then((r) => {
                        if(r.length>0)  
                        {
                            console.log(r)
                            dataReserva = r;
                            window.location.hash = '#/consultafecha';
                            dataReserva = null;
                        }
                        else
                            alert("No hay turnos para la fecha ingresada")
                    })
                })

                element.addEventListener('mouseover', (event) => {
                        element.style['background-color'] = "#7ca3b9";
                        element.style['border-radius'] = "10px";
                })
                element.addEventListener('mouseout', (event) => {
                    let f = new Date(yearActual,mesActualNumber,event.target.innerHTML);
                    if(f.toLocaleDateString() == fechaDeHoy.toLocaleDateString()) //es el dia de hoy
                        element.style['background-color'] = "black";
                    else
                        element.style['background-color'] = "#66b6e1";
                })
                
            }
        }

        const sacaListeners = () => {}

        const creaCalendario = () => {

        for(let i = startDay(yearActual,mesActualNumber); i>0;i--){// Va agregando un div con los dias de atras del que arranca. Es dceir, arranque un sabado, y escribe viernes jueves ... llenando c los dias
            fechasHTML.innerHTML += ` <div class="calendar__date calendar__item calendar__last-days">
                ${longMes(mesActualNumber-1)-(i-1)}
            </div>`;
        }

        for(let i=1; i<=longMes(mesActualNumber); i++)
        { //Llena con los dias del mes hasta la cantidad de dias que tenga el mes

            let dia = new Date(yearActual,mesActualNumber,i)
            if(dia < fechaDeHoy && dia.toLocaleDateString() != fechaDeHoy.toLocaleDateString())
            {
                fechasHTML.innerHTML += ` <div class="calendar__date calendar__item calendar__last-days">
                ${i}
                </div>`;
            }
            else
            {
                if(i===diaActual && mesActualNumber == fechaDeHoy.getMonth() && yearActual == fechaDeHoy.getFullYear()) {
                    fechasHTML.innerHTML += ` <div style="" class="calendar__date calendar__item calendar__today">${i}</div>`; //no me conviene hacer un appendChild?
                }else{
                    fechasHTML.innerHTML += ` <div class="calendar__date calendar__item">${i}</div>`;
                }
            }

        }
        agregaListener();
    }

    //Calcula cantidad de dias dependiendo el mes que estoy parado
    const longMes = (month) => 
    {
        if(month === -1) month = 11;
        if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) 
            return  31;
        else if (month == 3 || month == 5 || month == 8 || month == 10) 
            return 30;
        else 
            return bisiesto() ? 29:28;
    }

    //Es bisiesto?
    const bisiesto = () => {
        return ((yearActual % 100 !==0) && (yearActual % 4 === 0) || (yearActual % 400 === 0));
    }

    //Devuelve el dia el cual debe arrancar el mes
    const startDay = (year,mes) => {
        let dia = new Date(year, mes, 1);
        return ((dia.getDay()-1) === -1) ? 6 : dia.getDay()-1;
    }


    //Mes pasado
    const lastMonth = () => {
        //sacaListeners() No se si no seria al pedo pq cuando cambio de fecha estos divs desaparecen del dom entonces se irian sus listeners...
        console.log(mesActualNumber)
        if(mesActualNumber !== 0){
            mesActualNumber--;
        }else{
            mesActualNumber = 11;
            yearActual--;
        }
        console.log(mesActualNumber)
        setNewDate();
    }

    //Mes siguiente
    const nextMonth = () => {
        console.log(mesActualNumber)
        sacaListeners()
        if(mesActualNumber !== 11){
            mesActualNumber++;
        }else{
            mesActualNumber = 0;
            yearActual++;
            //mesActualNumber++;
        }
        console.log(mesActualNumber)

        setNewDate();
    }
    //Cuando hubo un cambio de mes hace esto
    const setNewDate = () => {
        fechaActual.setFullYear(yearActual,mesActualNumber,diaActual);
        mesHTML.textContent = labelMeses[mesActualNumber];
        yearHTML.textContent = yearActual.toString();
        fechasHTML.textContent = '';
        creaCalendario(mesActualNumber);
    }

    creaCalendario(mesActualNumber);
    
    return divElement;
};