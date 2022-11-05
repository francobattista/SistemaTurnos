//TODOS LOS TURNOS DE UN USUARIO PARA TODAS LAS SUCURSALES

let uuidMap = '1bf15f94-d581-42e5-a602-bc7fafac3ab9'
let srcMap = 'https://app.cartes.io/maps/' + uuidMap + '/embed?type=map';
//src="https://app.cartes.io/maps/1bf15f94-d581-42e5-a602-bc7fafac3ab9/embed?type=map"

const getBaseMap = () => { 
    return new Promise((res,rej) => {
        fetch("https://cartes.io/api/maps/" + uuidMap, {
            method: 'GET',
            headers: new Headers({ 'Accept': 'application/json'}),
    }).then((response) => {
            response.json().then((data) => 
            {
                res(data)
                
            })
        }).catch(() =>{ rej('error'); } )
        
    })
}

const addMarker = (element) => { 

    let body =JSON.stringify({
        lat:element.lat,
        lng:element.lng,
        description:"Cancha de soccer",
        category_name:element.name
    })
    console.log(body)

    return new Promise((res,rej) => {
        fetch("https://cartes.io/api/maps/" + uuidMap + '/markers', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json'}),
            body:body,
        }).then((response) => {
            response.json().then((data) => res((data)))
        }).catch((err) =>{ rej(err); } )
    })

 
}

const deleteMarker = (element) => { 

    console.log(element)
    return new Promise((res,rej)=>{
    fetch("https://cartes.io/api/maps/" + uuidMap + '/markers/' + element.id, {
        method: 'DELETE',
        headers: new Headers({ 'Content-Type': 'application/json'}),
    }).then((response) => {
            response.json().then((data) => res(JSON.parse(data)))
        }).catch((err) =>{ rej(err); } )


    })

}

const getSucursalesFromMap = (uid) => {
    return new Promise((res,rej) => {

    fetch("https://cartes.io/api/maps/" + uuidMap + "/markers", {
        method: 'GET',
        headers: new Headers({ 'Accept': 'application/json'}),
    }).then((response) => {
        response.json().then((data) => res(JSON.parse(data)))
    }).catch((err) =>{ rej(err); } )
    }) 
   
}

const getMapMarkers = () => {
    return new Promise((res,rej) => {
        fetch("https://cartes.io/api/maps/" + uuidMap + "/markers", {
            method: 'GET',
            headers: new Headers({ 'Accept': 'application/json'}),
        }).then((response) => {
            response.json().then((data) => {console.log(data);res(data)})
        }).catch(() =>{ console.log("error"); } )
        })

}

const createMap = () => {
    return new Promise((res,rej) => {
        fetch("https://cartes.io/api/maps/" + uuidMap + "/markers", {
            method: 'GET',
            headers: new Headers({ 'Accept': 'application/json'}),
        }).then((response) => {
            response.json().then((data) => {
                uuidMap=''; //aca tengo q cambiar el id del mapa
                res(JSON.parse(data))
            }
            )
        }).catch(() =>{ console.log("error"); } )
        })
}



export {getBaseMap, deleteMarker, addMarker ,getMapMarkers, createMap, srcMap} //Si tuviera una clase puedo exportar la clase, pero aca se exportar funciones asi.