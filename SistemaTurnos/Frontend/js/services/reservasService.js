


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
            response.json().then((data) => 
            {
                if(res.status != 200)
                    reject(JSON.parse(data))
                else
                    response(JSON.parse(data))
            })
        }).catch((err) =>{ reject(err); } )
    })
}

const confirmaReserva = (idReserva,email,userId) => { 
    console.log("metodo: confirmaReserva")
    return new Promise((response,reject) => {
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
        .then((res) => 
        {
            res.json().then((data) => 
            {
                if(res.status != 200)
                    reject(JSON.parse(data))
                else
                    response(JSON.parse(data))
            })
        }).catch((err) =>{ reject(err); } )
    })
}


//POSTS



//DELETE


const bajaReserva= (idReserva) => { 
    let config = {
        method: 'PUT',
        headers: headerPut,
}

return new Promise((response,reject) => 
{
    fetch("http://localhost:3030/api/reservas/" + String(idReserva),config).
    then((res) => {
        res.json().then(( (data) => 
        {
            if(res.status != 200)
                reject(JSON.parse(data))
            else
                response(JSON.parse(data))
        }))
    }).catch((err) =>{ reject(err); } )
})

}


//GETTERS


//Trae una sola reserva en base de una idReserva
const getReserva = (idReserva) =>{

    let config = {
        method: 'GET',
        headers: headerPut,
}

return new Promise((response,reject) => {
    fetch("http://localhost:3030/api/reservas/" + String(idReserva),config)
    .then((res) => res.json().then( (data) => 
    {
        if(res.status != 200)
            reject(JSON.parse(data))
        else
            response(JSON.parse(data))
    }))
    .catch((err) =>{ reject(err); } )
})

}

//TODO S LOS TURNOS DE UNA SUCURSAL (CAMBIAR A QUERY PARAMS), O DE USUARIO EN UNA SUCURSAL


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
    return new Promise((response,reject) => {
 
        fetch("http://localhost:3030/api/reservas?" + queryParams.toString(),config)
        .then((res) => res.json().then( (data) => {
            console.log(data)
            if(res.status != 200)
                reject(data)
            else
                response(JSON.parse(data))
        }))
        .catch((err) =>{ reject(err); } )
    })
}

const getTurnosSucursal = (idSucursal, fecha) => { 

    
    return new Promise((response,reject) => {
        fetch("http://localhost:3030/api/reservas/" + String(idSucursal), {
            method: 'GET',
    }).then((res) => res.json().then( (data) => 
    {
        if(res.status != 200)
            reject(JSON.parse(data))
        else
            response(JSON.parse(data))
    }))
        .catch((err) =>{ reject(err); } )
    })

}



export {getTurnosSucursal, altaReserva, bajaReserva, getTurnosByParam, getReserva,confirmaReserva} //Si tuviera una clase puedo exportar la clase, pero aca se exportar funciones asi.