const host = 'localhost' ;
const port = '3030';

const hostAuth= 'localhost';
const portAuth= '3020';


const headerPost = {

}


const headerGet = {

}

const headerPut = {
    'Content-Type': 'application/json',
    
}


const headerDelete = {

}



//--------------------------INVITADO-------------------------------------------

//PUTS


const altaReserva = (idReserva,email,userId) => { 
    console.log("metodo: altaReserva")
    return new Promise((res,rej) => {
        console.log(idReserva,email)
        if(!idReserva || !email)
            rej("Error, parametros erroneos")

        let config = {
            method: 'POST',
            headers: headerPut,
            body: JSON.stringify(
            {
                "userId" : String(userId)
            })
        }
    
        fetch(`http://${host}:${port}/api/reservas/solicitar/` + String(idReserva), config) 
        .then((response) => {
            response.json().then((data) => 
            {
                if(typeof(data) == 'string')
                    data = JSON.parse(data);
                if(response.status != 200)
                    rej(data)
                else
                    res(data)
            }).catch((err) => console.log(err))
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
            method: 'POST',
            headers: headerPut,
            body: JSON.stringify(
            {
                "email" : email,
                "userId" : String(userId)
            })
        }

        fetch(`http://${host}:${port}/api/reservas/confirmar/` + String(idReserva), config) // http://localhost:3030/api/reserva/1
        .then((response) => 
        {
            response.json().then((data) => 
            {
                if(typeof(data) == 'string')
                    data = JSON.parse(data);
                if(response.status != 200)
                    rej(data)
                else
                    res(data)
            }).catch((err) => console.log(err))
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
    fetch(`http://${host}:${port}/api/reservas/` + String(idReserva),config)
    .then((response) => 
    {
        response.json().then( (data) => 
        {
            if(typeof(data) == 'string')
                data = JSON.parse(data);
            if(response.status != 200)
                rej(data)
            else
                res(data)
        }).catch((err) => console.log(err))
    }).catch((err) =>{ rej(err); })
    
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
    return new Promise((res,rej) => {
 
        fetch(`http://${host}:${port}/api/reservas?` + queryParams.toString(),config)
        .then((response) => {
            response.json().then( (data) => {
            if(typeof(data) == 'string')
                data = JSON.parse(data);
            if(response.status != 200)
                rej(data)
            else
                res(data)
        })}).catch((err) => console.log(err))
        .catch((err) =>{ rej(err); } )
    })
}



//--------------------------AUTH-------------------------------------------

//PUTS


const altaReservaAuth = (idReserva,email,userId) => { 
    console.log("metodo: altaReserva")
    return new Promise((res,rej) => {
        console.log(idReserva,email)
        if(!idReserva || !email)
        {
            rej("Error, parametros erroneos")
        }
        const headerPutAuth={
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')   
        }
        
        let config = {
            method: 'POST',
            headers: headerPutAuth,
            body: JSON.stringify(
            {
                "userId" : String(userId)
            })
        }
    
        fetch(`http://${hostAuth}:${portAuth}/api/reservas/solicitar/` + String(idReserva), config) 
        .then((response) => {
            response.json().then((data) => 
            {
                if(typeof(data) == 'string')
                    data = JSON.parse(data);
                if(response.status == 200)
                    res(data)
                else
                    if(response.status == 401)
                    {
                        data.auth = 1
                        rej(data)
                    }
                    else
                        rej(data)
                })
        }).catch((err) =>{ rej(err); } )
    })
}

const confirmaReservaAuth = (idReserva,email,userId) => { 
    console.log("metodo: confirmaReserva")
    return new Promise((res,rej) => {
        if(!idReserva || !email)
        {
            rej("Error, parametros erroneos")
        }
        const headerPutAuth={
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')   
        }

        let config = {
            method: 'POST',
            headers: headerPutAuth,
            body: JSON.stringify(
            {
                "email" : email,
                "userId" : String(userId)
            })
        }

        fetch(`http://${hostAuth}:${portAuth}/api/reservas/confirmar/` + String(idReserva), config) // http://localhost:3030/api/reserva/1
        .then((response) => 
        {
            response.json().then((data) => 
            {
                if(typeof(data) == 'string')
                    data = JSON.parse(data);
                if(response.status == 200)
                    res(data)
                else
                    if(response.status == 401)
                    {
                        data.auth = 1
                        rej(data)
                    }
                    else
                        rej(data)
                })
        }).catch((err) =>{ rej(err); } )
    })
}


//POSTS



//DELETE


const bajaReservaAuth = (idReserva) => {
    
    const headerPutAuth={
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')   
    }
    
    let config = {
        method: 'DELETE',
        headers: headerPutAuth,
        body: JSON.stringify({
            userId : window.sessionStorage.getItem('userId')
         })
    }

return new Promise((res,rej) => 
{
    fetch(`http://${hostAuth}:${portAuth}/api/reservas/` + String(idReserva),config).
    then((response) => {
        response.json().then(( (data) => 
        {
            if(typeof(data) == 'string')
                data = JSON.parse(data);
            if(response.status == 200)
                res(data)
            else
                if(response.status == 401)
                {
                    data.auth = 1
                    rej(data)
                }
                else
                    rej(data)
            }))
    }).catch((err) =>{ rej(err); } )
})

}


//GETTERS


//Trae una sola reserva en base de una idReserva
const getReservaAuth = (idReserva) =>{

    const headerPutAuth={
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')   
    }
    

    let config = {
        method: 'GET',
        headers: headerPutAuth,
}

return new Promise((res,rej) => {
    fetch(`http://${hostAuth}:${portAuth}/api/reservas/` + String(idReserva),config)
    .then((response) => response.json().then( (data) => 
    {
        if(typeof(data) == 'string')
            data = JSON.parse(data);
        if(response.status == 200)
            res(data)
        else
            if(response.status == 401)
            {
                data.auth = 1;
                rej(data)
            }
            else
                rej(data)
        }))
    .catch((err) =>{ rej(err); } )
})

}

//TODO S LOS TURNOS DE UNA SUCURSAL (CAMBIAR A QUERY PARAMS), O DE USUARIO EN UNA SUCURSAL


const getTurnosByParamAuth = (idUsuario, fecha, idSucursal) =>
{

    const headerPutAuth={
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')   
    }
    console.log("a");
    let config = {
        method: 'GET',
        headers: headerPutAuth,
    }

    let queryParams = new URLSearchParams();
    queryParams.set('userId',String(idUsuario))
    queryParams.set('dateTime', fecha)

    if(idSucursal) queryParams.set('branchId',String(idSucursal))
    return new Promise((res,rej) => {
 
        fetch(`http://${hostAuth}:${portAuth}/api/reservas?` + queryParams.toString(),config)
        .then((response) => response.json().then( (data) => {
            if(typeof(data) == 'string')
                data = JSON.parse(data);
            if(response.status == 200)
                res(data)
            else
                if(response.status == 401)
                {
                    data.auth = 1;
                    rej(data);
                }
                else
                    rej(data)
            }))
        .catch((err) =>{ rej(err); } )
    })
}



export { altaReserva, getTurnosByParam, getReserva,confirmaReserva,altaReservaAuth, getTurnosByParamAuth,bajaReservaAuth, getReservaAuth,confirmaReservaAuth} //Si tuviera una clase puedo exportar la clase, pero aca se exportar funciones asi.