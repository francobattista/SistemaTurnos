//TODOS LOS TURNOS DE UN USUARIO PARA TODAS LAS SUCURSALES

let uuidMap = '8752b918-b3eb-4282-8ba7-571c40fce0c4'
let srcMap = 'https://app.cartes.io/maps/' + uuidMap + '/embed?type=map&lat=-38.021465783288015&lng=-57.55720138549805&zoom=12';

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
        }).catch(() =>{ rej('ERROR: No se pudo dibujar el mapa'); } )
        
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
        }).catch((err) =>{ rej("ERROR: No se pudo dibujar el marker"); } )
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