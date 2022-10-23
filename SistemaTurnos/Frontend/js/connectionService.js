


const getTurnos = () => { 
    fetch("http://localhost:3030/api/reservas", {
        method: 'GET',
        headers: new Headers({ 'Content-type': 'application/json'}),
        mode: 'no-cors'
}).then((response) => {
        console.log(response)
        //reservaTurno()
    }).catch(() =>{ console.log("error"); } )
}

const getTurno = () => { 
    fetch("http://localhost:3030/api", {
        method: 'GET',
        headers: new Headers({ 'Content-type': 'application/json'}),
        mode: 'no-cors'
}).then((response) => {
        console.log(response)
        //reservaTurno()
    }).catch(() =>{ console.log("error"); } )
}

const reservaTurno = () => { 
    fetch("http://localhost:3030/api/reservas", {
        method: 'GET',
        headers: new Headers({ 'Content-type': 'application/json'}),
        mode: 'no-cors'
}).then((response) => {
        console.log(response)
        //reservaTurno()
    }).catch(() =>{ console.log("error"); } )
}

const cancelaTurno = () => { 
    fetch("http://localhost:3030/api", {
        method: 'GET',
        headers: new Headers({ 'Content-type': 'application/json'}),
        mode: 'no-cors'
}).then((response) => {
        console.log(response)
        //reservaTurno()
    }).catch(() =>{ console.log("error"); } )
}


export {reservaTurno} //Si tuviera una clase puedo exportar la clase, pero aca se exportar funciones asi.