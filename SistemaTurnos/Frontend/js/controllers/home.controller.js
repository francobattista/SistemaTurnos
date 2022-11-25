// import html from ... login.html

//Eso se puede hacer con webpack, y me ahorra tener que pasar las vistas como string aca, es decir, podria usar un arch html
import { deleteMarker ,getBaseMap,getMapMarkers,createMap, addMarker , srcMap } from '../services/mapService.js';
import {getSucursales} from '../services/sucursalesService.js'



export default () => {
    let sucursales;

    const view = `

        <h1 id="h1Princ">El Potrero de Coccaro</h1>
        <div id="divMapa">
            <iframe id="map" width="70%" height="600" frameborder="0";></iframe>
        </div>
    `;
    const divElement = document.createElement("div");
    divElement.innerHTML = view;

    

    
    const addOrDeleteSucursal = () =>{
        getMapMarkers().then((sucursalesDibujadas) => 
        {   
           sucursalesDibujadas.forEach((suc) => {
                let drawed = false;
                sucursales.forEach(element => {
                    if(suc.location.coordinates[0] === element.lng && suc.location.coordinates[1] === element.lat)
                        drawed=true;
                })
                //if(drawed)
               //     deleteMarker(suc)

            })

            sucursales.forEach((element) => {
                let drawed = false;
                sucursalesDibujadas.forEach(suc => {
                    if(suc.location.coordinates[0] === element.lng && suc.location.coordinates[1] === element.lat)
                        drawed=true;
                })
                if(!drawed)
                    addMarker(element);

            })
            const map = divElement.querySelector("#map");
            console.log(srcMap)
            map.src = srcMap;
        }
        )
            
            //addSucursal(element.name,element.lat, element.lng);
        
    }

    const getBaseMapHome = () => {
        let mapa;
        getBaseMap().then((map) => {
            mapa = map;
            console.log(mapa)
            if (!mapa)
                createMap().then((map) => {
                    mapa = map;
                });

            addOrDeleteSucursal();
        });

        
    }    

    const getSucursalesM = () => {
        getSucursales().then((data) => 
        {
            sucursales = data
            getBaseMapHome();
        }
        ).catch((err) => {alert("Error pidiendo las sucursales")})
    }



    getSucursalesM();

    return divElement;
  };