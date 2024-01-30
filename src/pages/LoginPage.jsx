import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import authAPI from '../services/authAPI';

const LoginPage = (props) => {
    const navigate = useNavigate()
    
    //Ceci est un hook qui crée un state (une variable d'état) dans react, car je dois envoyer un objet à mon API pour vérifier l'id et mot de passe du user. Donc par défaut tu as 1 objet, avec 2 paramètres : username et password. 
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    // Afficher une erreur là où y'en a une; si y'en a une
    const[error, setError] = useState("")

    // HandleChange permet la fonctionnalité d'écriture dans un champs et de l'enregister/le récupérer en temps réel dans UseState
    const handleChange = (event) => {
        const value = event.currentTarget.value
        const name = event.currentTarget.name

        //pour copier ... et avec une virgule on peut ajouter ou remplacer un élément dans sa copie

        //SetCredentials permet de modifier la ligne 7 et 8. Avec les "..." on copie le contenus de ces lignes, et il y appliques les nouvelles valeurs saisies dans le champs de saisi de connexion grace au HandleChange. 
        setCredentials({...credentials, [name]:value})

    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            await authAPI.authenticate(credentials)
            setError("")
            //permet de modifier les boutons de connexion de la navbar 
            props.onLogin(true)
            //permet de rediriger le user vers customer une fois qu'il vient de se connecter
            navigate("/customers", {replace: true})
        }catch(error)
        {
            setError("Aucun compte ne possède cette adresse e-mail ou les iformations ne correspondent pas")
        }
    }

    return ( 
        <>
            <div className="row">
                <div className="col-4 offset-4">
                    <h1>Connexion</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group my-3">
                            <label htmlFor="username">Adresse E-mail</label>
                            <input 
                                type="email" 
                                value={credentials.username}
                                onChange={handleChange}
                                placeholder='Adresse E-mail de connexion'
                                id='username'
                                name='username'
                                className={"form-control " + (error && "is-invalid")}
                            />
                        { error && (
                                <p className='invalid-feedback'>{error}</p>
                        )}
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="password">Mot de passe</label>
                            <input 
                            type="password" 
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder='Mot de passe'
                            id='password'
                            name='password'
                            className='form-control' />
                        </div>
                        <div className="form-group my-3">
                            <button className="btn btn-success">Connexion</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
     );
}

export default LoginPage;