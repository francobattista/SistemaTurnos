import { getTurnosByParamAuth } from "../../services/reservasService.js";

export default (data) => {
    console.log(data)
    const view = `
        <h1>MIS TURNOS<h1>
    `;
    const divElement = document.createElement("div");
    divElement.innerHTML = view;

    getTurnosByParamAuth(1,'','').then((turnos) => {
        let turnosDiv = document.createElement('div')
        if(turnos.length > 0)
            turnos.forEach(element => {   
                let turno = document.createElement('div');
                let cancel = document.createElement('a');
                cancel.addEventListener('click',(event) => {
                    console.log(event.target.parentElement.body)
                })
                cancel.innerHTML = "CANCELAR TURNO"
                turno.innerHTML = new Date(element.dateTime).toLocaleString() + ' '
                turno.body = element;
                turno.appendChild(cancel)
                turnosDiv.appendChild(turno)
            });
        else
            turnosDiv.innerHTML = "NO TIENE TURNOS!"
        divElement.appendChild(turnosDiv)
    })


    return divElement;
}