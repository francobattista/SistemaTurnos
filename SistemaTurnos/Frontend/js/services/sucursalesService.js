




/*getHeaders = {
    
}*/


const getSucursales = () => 
{ 

    return new Promise((response,reject) => {

        let config = {
            method: 'GET',
            //headers: new Headers({ 'Content-type': 'application/json'}) OJO CON ESTE HEADER QUE ME TIRA DUPLICADA LA REQUEST
        };
    
        fetch('http://localhost:3030/api/sucursales', config)
        .then((res) => {   //Tipo HTTPResponse: {status: algo; code:200 ... etc}
                res.json().then( //Desencapsula el body, y lo transforma en JSON.
                    (data) => {
                    if(res.status == 200)
                        response(JSON.parse(data))
                    else
                        reject(data)
                    });
            }).catch( (err) => 
            {
                reject(err)
            })
    }
    )
}


const getSucursal = (idSucursal) => 
{ 
    let config = {
        method: 'GET',
        //headers: new Headers({ 'Content-type': 'application/json'}) OJO CON ESTE HEADER QUE ME TIRA DUPLICADA LA REQUEST
    };

    return new Promise((response,reject) => {

    fetch('http://localhost:3030/api/sucursales/' + String(idSucursal), config)
    .then(res => {   
        res.json().then((data) => 
        {
            if(res.status == 200)
                response(JSON.parse(data))
            else
                reject((data))
        })
    }).catch((err) => {
            reject(err)
    })})


}


export {getSucursales, getSucursal} //Si tuviera una clase puedo exportar la clase, pero aca se exportar funciones asi.