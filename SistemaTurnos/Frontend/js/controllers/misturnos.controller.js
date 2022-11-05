import { getTurnosByParam } from "../services/reservasService.js";

export default (data) => {
    console.log(data)
    const view = `
        <h1>MIS TURNOS<h1>
    `;
    const divElement = document.createElement("div");
    divElement.innerHTML = view;

    getTurnosByParam(1,'','').then((turnos) => {
        let turnosDiv = document.createElement('div')
        if(turnos.length > 0)
            turnos.forEach(element => {   
                let turno = document.createElement('div');
                turno.innerHTML = new Date(element.dateTime).toLocaleString()
                turno.body = element;
                turnosDiv.appendChild(turno)
            });
        else
            turnosDiv.innerHTML = "NO TIENE TURNOS!"
        divElement.appendChild(turnosDiv)
    })


    return divElement;
}