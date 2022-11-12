
export const createAuthClient = (divElement) => {
    auth0.createAuth0Client({
        domain: "dev-enjgvjw7srdpn1x1.us.auth0.com",
        clientId: "R7MwFIXgCMgvblhVY6aGMLEpZ769rfpr",
        //responseType:'code',
        authorizationParams: {
            redirect_uri: window.location.origin + '/' + window.location.hash
        }
  }).then(async (auth0Client) => {
    console.log(auth0Client)
    // Assumes a button with id "login" in the DOM
    const loginButton = divElement.querySelector("#btnLogin");
    console.log(loginButton)
    loginButton.addEventListener("click", (e) => {
      e.preventDefault();
      auth0Client.loginWithRedirect().then(token => {console.log(token)});
    });
  
    if (location.search.includes("state=") && 
        (location.search.includes("code=") || 
        location.search.includes("error="))) {
      auth0Client.handleRedirectCallback().then((token) =>{
        console.log(token)
        window.history.replaceState({}, document.title, "/#/login");
      });
    }
  
    // Assumes a button with id "logout" in the DOM
    //const logoutButton = divElement.querySelector("logout");
  
    //logoutButton.addEventListener("click", (e) => {
      //e.preventDefault();
      //auth0Client.logout();
    //});
  
    const isAuthenticated = await auth0Client.isAuthenticated();
    const userProfile = await auth0Client.getUser();
    console.log(isAuthenticated)
    console.log(userProfile)

    auth0Client.getIdTokenClaims().then(sessionData => {if(sessionData) window.sessionStorage.setItem('token',sessionData.__raw)}); //ACA TENGO EL TOKEN ID
    // Assumes an element with id "profile" in the DOM
    /*const profileElement = document.getElementById("profile");
  
    if (isAuthenticated) {
      profileElement.style.display = "block";
      profileElement.innerHTML = `
              <p>${userProfile.name}</p>
              <img src="${userProfile.picture}" />
            `;
    } else {
      profileElement.style.display = "none";
    }*/
  });
}
