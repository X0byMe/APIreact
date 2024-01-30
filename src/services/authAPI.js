import Axios from 'axios'
import { jwtDecode } from 'jwt-decode'

function authenticate(credentials)
{
    return Axios
            .post("http://apicourse.myepse.be/api/login_check", credentials)
            .then(response => response.data.token)
            .then(token => {
                // mettre le token dans le localStorage pour éviter de devoir se reconnecter à chaque fois à l'API. 
                window.localStorage.setItem("authToken", token)
                // aouter à Axios pour chaque req, le bearer token
                Axios.defaults.headers["Authorization"] = "Bearer " + token
                return true
            })
}

/**
 * Si tu te deconnectes toi-même, je ne vais plus garder le token dans le navigateur.
 */
function logout(){
    window.localStorage.removeItem("authToken")
    delete Axios.defaults.headers["Authorization"]
}

/**
 * Lorsque tu rechargeras ta page, tu iras vers l'index. Je veux donc vérifier si j'ai un token dans le navigateur pour éviter de devoir te reconnecter.
 */
function setup(){
    // voir si on a un token
    const token = window.localStorage.getItem("authToken")
    if(token)
    {
        const jwtData = jwtDecode(token)
        // je récupère d'un symfo php (l'API) dont la réponse est en secondes, que je transfert à un react en JS qui est en milliseconde.
        if((jwtData.exp * 1000) > new Date().getTime())
        {
            Axios.defaults.headers["Authorization"]="Bearer " + token
        }
    }
}

/**
 * Vérifier si on est déjà connecté, ou si un token est déjà existant
 */
function isAuthenticated() {
    const token = window.localStorage.getItem("authToken")
    if(token)
    {
        const jwtData = jwtDecode(token)
        if((jwtData.exp * 1000) > new Date().getTime())
        {
            return true //ok il est authentifié
        }
        return false // il existe mais est expiré
    }
    return false // pas de token
}


export default {
    authenticate: authenticate,
    logout: logout,
    setup: setup,
    isAuthenticated:isAuthenticated
}