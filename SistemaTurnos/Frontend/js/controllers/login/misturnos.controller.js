import { bajaReservaAuth, getTurnosByParamAuth } from "../../services/reservasService.js";

export default (data) => {
    console.log(data)
    const view = `
        <h1 style="-webkit-text-stroke:2px rgb(8, 191, 26); margin-left:5px; color:white;">MIS TURNOS<h1>
    `;
    const divElement = document.createElement("div");
    divElement.innerHTML = view;


    const userUnauthorized = () =>{
        window.location.hash = '#/login';
      }

    getTurnosByParamAuth(sessionStorage.getItem('userId'),'','').then((turnos) => {
        let turnosDiv = document.createElement('div')
        if(turnos.length > 0)
            turnos.forEach(element => {   
                let turno = document.createElement('div');
                let cancel = document.createElement('a');
                cancel.addEventListener('click',(event) => {
                    bajaReservaAuth(event.target.parentElement.body.idReserva).then((res)=>{
                        alert("Turno cancelado cone exito!")
                        window.location.hash = '#/home'
                    }).catch((err)=> {
                        if(err.auth)
                            userUnauthorized();
                        else
                            alert(err)
                    });
                })
                cancel.innerHTML = "CANCELAR TURNO"
                turno.innerHTML = new Date(element.dateTime).toLocaleString() + ' '
                turno.body = element;
                turno.appendChild(cancel)
                turnosDiv.appendChild(turno)
                turnosDiv.style["-webkit-text-stroke"] =  "2px rgb(8, 191, 26)";
                turnosDiv.style['color'] = 'white'
                turnosDiv.style['font-size'] = '30px'
                turnosDiv.style['margin-left'] = '10px'
            });
        else{
            turnosDiv.innerHTML = "NO TIENE TURNOS!"
            turnosDiv.style["-webkit-text-stroke"] =  "2px rgb(8, 191, 26)";
            turnosDiv.style['color'] = 'white';
            turnosDiv.style['font-size'] = '30px'
            turnosDiv.style['margin-left'] = '10px'
        }
        divElement.appendChild(turnosDiv)
    }).catch((err) => {
        if(err.auth)
            userUnauthorized();
        else
            alert("Sin conexion con el servidor")
    })


    return divElement;
}