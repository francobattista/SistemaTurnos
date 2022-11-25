
//---------------------------------INVITADO-------------------------------

const host = 'localhost' ;
const port = '3030';

const hostAuth= 'localhost';
const portAuth= '3020';



const getSucursales = () => 
{ 

    return new Promise((res,rej) => {
        const getHeaders={
            'Content-Type': 'application/json',
        }

        let config = {
            method: 'GET',
            headers: getHeaders
        };
    
        fetch(`http://${host}:${port}/api/sucursales`, config)
        .then((response) => {   //Tipo HTTPResponse: {status: algo; code:200 ... etc}
            response.json().then( //Desencapsula el body, y lo transforma en JSON.
                    (data) => {
                        console.log(data)
                    if(typeof(data) == 'string')
                        data = JSON.parse(data);
                    if(response.status == 200)
                        res(data)
                    else
                        rej(data)
                    }).catch((err) => console.log(err));
            }).catch( (err) => 
            {
                rej(err)
            })
    }
    )
}


const getSucursal = (idSucursal) => 
{ 
    const getHeaders={
        'Content-Type': 'application/json',
    }

    let config = {
        method: 'GET',
        headers: getHeaders
    };

    return new Promise((res,rej) => {

    fetch(`http://${host}:${port}/api/sucursales/` + String(idSucursal), config)
    .then(response => {   
        response.json().then((data) => 
        {
            if(typeof(data) == 'string')
                data = JSON.parse(data);
            if(response.status == 200)
                res((data))
            else
                rej((data))
        }).catch((err) => console.log(err))
    }).catch((err) => {
            rej(err)
    })})

}

//------------------------------AUTH------------------------------------

const getSucursalesAuth = () => {
    
    return new Promise((res,rej) => {

        const getHeadersAuth={
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')   
        }
    
        let config = {
            method: 'GET',
            headers: getHeadersAuth
        };
        console.log(getHeadersAuth)
        fetch(`http://${hostAuth}:${portAuth}/api/sucursales`, config)
        .then((response) => {   
                response.json().then( 
                    (data) => {
                    if(typeof(data) == 'string')
                        data = JSON.parse(data);
                    if(response.status == 200)
                        res(data)
                    else
                        if(response.status == 401)
                        {
                            data.auth = 1
                            rej(data,1)
                        }
                        else
                            rej(data)
                    }).catch((err) => console.log(err));
            }).catch((err) =>{
                rej(err)
            })
        })
}

const getSucursalAuth = (idSucursal) => 
{ 
    const getHeadersAuth={
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')   
    }

    let config = {
        method: 'GET',
        headers: getHeadersAuth
    };

    return new Promise((res,rej) => {

    fetch(`http://${hostAuth}:${portAuth}/api/sucursales/` + String(idSucursal), config)
    .then(response => {   
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
                    rej(data,1)
                }
                else
                    rej(data)
            }).catch((err) => console.log(err))
    }).catch((err) => {
        rej(err)
    })})

}

export {getSucursales, getSucursal, getSucursalesAuth, getSucursalAuth} //Si tuviera una clase puedo exportar la clase, pero aca se exportar funciones asi.