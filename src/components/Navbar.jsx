import { NavLink, useNavigate } from "react-router-dom";
import authAPI from "../services/authAPI";

const Navbar = (props) => {
    //Permet de changer de composant/ de view, sans recharger la page, en cas de deconnexion par exemple
    const navigate = useNavigate()
    
    const handleLogout = () => {
        // dans authAPI, on a déjà créé un système de deconnexion
        authAPI.logout()
        //Je dois dire à la navbar que le user s'est déconnecté pour afficher à nouveau les bons boutons de connexion
        props.onLogout(false)
        // replace permet de faire comme si le user n'avait jamais été sur une page admin précédente, poru éviter qu'il fasse un retour en arrière avec la fleche et qu'il récup la page sur laquelle il était.
        navigate('/login', {replace: true})
    }
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">API-Platform React</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/customers">Clients</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/invoices">Factures</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {(!props.isAuthenticated) ? (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/" className="nav-link">Inscription</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/login" className="btn btn-success">Connexion</NavLink>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button onClick={handleLogout} className="btn btn-danger">Déconnexion</button>
                            </li>
                        )}
                        
                    </ul>
                </div>
            </div>
        </nav>
     );
}

export default Navbar;