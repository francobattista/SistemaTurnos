import {router} from './router/index.router.js'
import { altaReserva, getTurnosSucursal } from './services/reservasService.js'
import { getSucursal, getSucursales } from './services/sucursalesService.js'


/*console.log(router())



const div = document.getElementById('containerhs');

const childDiv = document.createElement('div')
const a = document.createElement('a')
a.innerHTML = "Hola!"
a.href = "#"
childDiv.appendChild(a)

div.appendChild(childDiv)*/



const monthNames = ['Enero', 'Febrero']

const tabla = document.getElementById("tableDias")

const childDiv1 = document.createElement('div')
childDiv1.innerHTML = "1"
childDiv1.style = "background-color: blue; height: 50px; width: 50px; position: relative; border: 1px solid black;"
tabla.appendChild(childDiv1)


const childDiv2 = document.createElement('div')

childDiv2.style = "background-color: blue; height: 50px; width: 50px; position: relative; border: 1px solid black;"
tabla.appendChild(childDiv2)
const childDiv3 = document.createElement('div')

childDiv3.style = "background-color: blue; height: 50px; width: 50px; position: relative; border: 1px solid black;"
tabla.appendChild(childDiv3)

const childDiv4 = document.createElement('div')
childDiv4.style = "background-color: blue; height: 50px; width: 50px; position: relative; border: 1px solid black;"
tabla.appendChild(childDiv4)



childDiv1.addEventListener('click', (event) => {
    
    altaReserva(1,'franco',2); //Me esta tirando un reload porque modifica el archivo reservas.json -> entonces como esta todo en el proyecto levantado con el live server, lo reinicia

    //bajaReserva();
    //getSucursales();

    //getSucursal(1)
    //getTurnosSucursal(2);
    //reservaTurno()
});


