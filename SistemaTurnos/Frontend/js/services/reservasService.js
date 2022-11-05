


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
    console.log("metodo: altaReserva")
    return new Promise((res,rej) => {
        console.log(idReserva,email)
        if(!idReserva || !email)
        {
            rej("Error, parametros erroneos")
        }
        let config = {
            method: 'PUT',
            headers: headerPut,
            body: JSON.stringify(
            {
                "userId" : String(userId)
            })
        }
    
        fetch("http://localhost:3030/api/reservas/solicitar/" + String(idReserva), config) 
        .then((response) => {
            if(response.status == 404)
                rej("No se ha podido reservar el turno")
            response.json().then(data => res(JSON.parse(data)))
        }).catch((err) =>{ rej(err); } )
    })
}

const confirmaReserva = (idReserva,email,userId) => { 
    console.log("metodo: confirmaReserva")

    return new Promise((res,rej) => {
        if(!idReserva || !email)
        {
            rej("Error, parametros erroneos")
        }

        let config = {
            method: 'PUT',
            headers: headerPut,
            body: JSON.stringify(
            {
                "email" : email,
                "userId" : String(userId)
            })
        }

        fetch("http://localhost:3030/api/reservas/confirmar/" + String(idReserva), config) // http://localhost:3030/api/reserva/1
        .then((response) => {
            response.json().then(data => res(JSON.parse(data)))
        }).catch((err) =>{ rej(err); } )
    })
}


//POSTS



//DELETE


const bajaReserva= (idReserva) => { 
    let config = {
        method: 'PUT',
        headers: headerPut,
}

return new Promise((res,rej) => 
{
    fetch("http://localhost:3030/api/reservas/" + String(idReserva),config).
    then((response) => {
        response.json().then((data) => res(JSON.parse(data)))
    }).catch((err) =>{ rej(err); } )
})

}


//GETTERS


//Trae una sola reserva en base de una idReserva
const getReserva = (idReserva) =>{

    let config = {
        method: 'GET',
        headers: headerPut,
}

return new Promise((res,rej) => {
    fetch("http://localhost:3030/api/reservas/" + String(idReserva),config)
    .then((response) => response.json().then( (r) => res(JSON.parse(r))))
    .catch((err) =>{ rej(err); } )
})

}

//TODOS LOS TURNOS DE UNA SUCURSAL (CAMBIAR A QUERY PARAMS), O DE USUARIO EN UNA SUCURSAL


const getTurnosByParam = (idUsuario, fecha, idSucursal) =>
{
    let config = {
        method: 'GET',
        headers: headerPut,
    }

    let queryParams = new URLSearchParams();
    queryParams.set('userId',String(idUsuario))
    queryParams.set('dateTime', fecha)
    queryParams.set('branchId',String(idSucursal))
    return new Promise((res,rej) => {
 
        fetch("http://localhost:3030/api/reservas?" + queryParams.toString(),config)
        .then((response) => response.json().then( (r) => res(JSON.parse(r))))
        .catch((err) =>{ rej(err); } )
    })
}

const getTurnosSucursal = (idSucursal, fecha) => { 

    
    return new Promise((res,rej) => {
        fetch("http://localhost:3030/api/reservas/" + String(idSucursal), {
            method: 'GET',
    }).then((response) => response.json().then( (r) => res(JSON.parse(r))))
        .catch((err) =>{ rej(err); } )
    })

}



export {getTurnosSucursal, altaReserva, bajaReserva, getTurnosByParam, getReserva,confirmaReserva} //Si tuviera una clase puedo exportar la clase, pero aca se exportar funciones asi.