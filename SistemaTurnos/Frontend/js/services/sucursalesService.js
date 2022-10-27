


const getSucursales = () => 
{ 
    let config = {
        method: 'GET',
        //headers: new Headers({ 'Content-type': 'application/json'}) OJO CON ESTE HEADER QUE ME TIRA DUPLICADA LA REQUEST
    };

    fetch('http://localhost:3030/api/sucursales', config)
    .then((response) => {   //Tipo HTTPResponse: {status: algo; code:200 ... etc}
            response.json().then( //Desencapsula el body, y lo transforma en JSON.
                (data) => console.log(JSON.parse(data)))
        }).catch( (error) => 
        {
            console.log(error)
        })
}


const getSucursal = (idSucursal) => 
{ 
    let config = {
        method: 'GET',
        //headers: new Headers({ 'Content-type': 'application/json'}) OJO CON ESTE HEADER QUE ME TIRA DUPLICADA LA REQUEST
    };

    fetch('http://localhost:3030/api/sucursales/' + String(idSucursal), config)
    .then(response => //Tipo HTTPResponse: {status: algo; code:200 ... etc}
        {   
            response.json().then( //Desencapsula el body, y lo transforma en JSON.
                (data) => console.log(JSON.parse(data)))
        }).catch( (error) => 
        {
            console.log(error)
        })
}




export {getSucursales, getSucursal} //Si tuviera una clase puedo exportar la clase, pero aca se exportar funciones asi.