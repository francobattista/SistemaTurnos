


const headerPost = {

}


const headerGet = {

}

const headerPut = {
    'Content-Type': 'application/json',
    
}


const headerDelete = {

}


//PUTS

const altaReserva = (idReserva,email,userId) => { 
    console.log("metodo: AltaReserva")
    let config = {
        method: 'PUT',
        headers: headerPut,
        body: JSON.stringify(
        {
            "email" : email,
            "userId" : String(userId)
        })
    }
    if(!userId)
        userId = '';
    fetch("http://localhost:3030/api/reserva/" + String(idReserva), config)
    .then((response) => {
        response.json().then(data => console.log(data))
    }).catch(() =>{ console.log("error"); } )
}


//POSTS



//DELETES


const bajaReserva= (idReserva) => { 
    let config = {
        method: 'PUT',
        headers: headerPut
}
    fetch("http://localhost:3030/api/reserva/" + String(idReserva),config).
    then((response) => {
        response.json().then((data) => console.log(data))
    }).catch(() =>{ console.log("error"); } )
}




//GETTERS

//TODOS LOS TURNOS DE UNA SUCURSAL (CAMBIAR A QUERY PARAMS), O DE USUARIO EN UNA SUCURSAL
const getTurnosSucursal = (idTurno) => { 
    fetch("http://localhost:3030/api/reserva/" + String(idTurno), {
        method: 'GET',
}).then((response) => response.json().then( (r) => console.log(JSON.parse(r))))
    .catch((e) =>{ console.log(e); } )
}


//TODOS LOS TURNOS DE UN USUARIO PARA TODAS LAS SUCURSALES
const getTurnosByUser = () => { 
    fetch("http://localhost:3030/api", {
        method: 'GET',
        headers: new Headers({ 'Content-type': 'application/json'}),
}).then((response) => {
        console.log(response)
        //reservaTurno()
    }).catch(() =>{ console.log("error"); } )
}


export {getTurnosSucursal, altaReserva, bajaReserva} //Si tuviera una clase puedo exportar la clase, pero aca se exportar funciones asi.