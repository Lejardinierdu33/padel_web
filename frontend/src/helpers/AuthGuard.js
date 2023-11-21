// Importation de la fonction Navigate depuis 'react-router-dom' pour la navigation
import { Navigate } from 'react-router-dom';

// Importation du service d'authentification depuis '../_services/account.service'
import { accountService } from '../_services/account.service';

// Définition du composant fonctionnel AuthGuard qui agit comme un garde de navigation
const AuthGuard = ({ children }) => {
  
  // Vérifie si l'utilisateur est connecté à l'aide du service d'authentification
  if (!accountService.isLogged()) {
    // Si l'utilisateur n'est pas connecté, redirige vers la page de connexion
    return <Navigate to="/auth/login" />;
  }

  // Sinon, affiche les enfants (le contenu protégé)
  return children;
};

// Exportation du composant AuthGuard par défaut
export default AuthGuard;
