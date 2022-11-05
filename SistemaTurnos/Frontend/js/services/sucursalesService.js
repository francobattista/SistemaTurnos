




/*getHeaders = {
    
}*/


const getSucursales = () => 
{ 

    return new Promise((res,rej) => {

        let config = {
            method: 'GET',
            //headers: new Headers({ 'Content-type': 'application/json'}) OJO CON ESTE HEADER QUE ME TIRA DUPLICADA LA REQUEST
        };
    
        fetch('http://localhost:3030/api/sucursales', config)
        .then((response) => {   //Tipo HTTPResponse: {status: algo; code:200 ... etc}
            console.log(response)
                response.json().then( //Desencapsula el body, y lo transforma en JSON.
                    (data) => {console.log(data);res(JSON.parse(data))});
            }).catch( (err) => 
            {
                rej(err)
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

    return new Promise((res,rej) => {

    fetch('http://localhost:3030/api/sucursales/' + String(idSucursal), config)
    .then(response => {   
        response.json().then((data) => res(JSON.parse(data)))
    }).catch((err) => {
            rej(err)
    })})


}


export {getSucursales, getSucursal} //Si tuviera una clase puedo exportar la clase, pero aca se exportar funciones asi.