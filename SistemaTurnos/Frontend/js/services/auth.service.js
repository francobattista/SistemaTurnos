
const generateUserId = (email) => { //Funcion que en base al mail genera un userId, entonces lo unico que hago es pasarle el email y siempre me da el mismo userID (esto pq no tengo una bd con el useId)
  let resp=0;
  for(let i = 0; i< email.length ; i++)
    resp += email.charCodeAt(i); //lo podria incluso multiplicar por su posicion en el arreglo
  return resp;
}



export const createAuthClient = (divElement) => {

    


    auth0.createAuth0Client({
        domain: "dev-enjgvjw7srdpn1x1.us.auth0.com",
        clientId: "R7MwFIXgCMgvblhVY6aGMLEpZ769rfpr",
        //responseType:'code',
        authorizationParams: {
            redirect_uri: window.location.origin + '/#/login' 
        }
  }).then(async (auth0Client) => {


    // Assumes a button with id "login" in the DOM
    console.log(window.location.origin + '/#/reservaturnoslog')
    const loginButton = divElement.querySelector("#btnLogin");
    loginButton.addEventListener("click", (e) => {
      e.preventDefault();
      auth0Client.loginWithRedirect().then(token => {console.log(token)});
    });
    //alert("aca")
    if (location.search.includes("state=") && 
        (location.search.includes("code=") || 
        location.search.includes("error="))) {
      auth0Client.handleRedirectCallback().then((token) =>{//Aca hay un problema, como cambio de componente, no me hace las cosas de la linea 26 en adelante
        
        auth0Client.getIdTokenClaims().then(sessionData =>
        {
            console.log(token)
            console.log(sessionData)
            if(sessionData) 
            {
              window.sessionStorage.setItem('token',sessionData.__raw)
              window.sessionStorage.setItem('email',sessionData.email)
              window.sessionStorage.setItem('userId',generateUserId(sessionData.email))
            }
            window.history.replaceState({}, document.title, "/");
            window.location.hash = '#/reservaturnoslog'
            //window.location.hash = "/#/reservaturnoslog"
        }); //ACA TENGO EL TOKEN ID

      });
    }


  });
  }


  export const createAuthClientLogOut = (divElement) => {
      auth0.createAuth0Client({
          domain: "dev-enjgvjw7srdpn1x1.us.auth0.com",
          clientId: "R7MwFIXgCMgvblhVY6aGMLEpZ769rfpr",
          //responseType:'code',
          authorizationParams: {
              redirect_uri: window.location.origin + '/' + window.location.hash
          }
    }).then(async (auth0Client) => {
        // Assumes a button with id "logout" in the DOM
    const logoutButton = divElement.querySelector("#btnLogout");
  
    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Por hacer logout")
      auth0Client.logout();
      window.sessionStorage.removeItem('token')
      window.sessionStorage.removeItem('userId')
      window.sessionStorage.removeItem('email')
    });
    })
  }

