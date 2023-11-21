// Import des modules nécessaires depuis React et d'autres bibliothèques
import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageModifDonne.css"; // Import du fichier de styles CSS
import { FaChevronRight } from "react-icons/fa"; // Import de l'icône "chevron droit" de react-icons
import { Link } from "react-router-dom"; // Import du composant Link pour la navigation entre pages
import axios from "axios"; // Import de la bibliothèque Axios pour effectuer des requêtes HTTP

// Définition du composant fonctionnel PageModifDonne
function PageModifDonne() {
  // Initialisation du navigateur pour la navigation entre pages
  const navigate = useNavigate();

  // Récupération des informations utilisateur depuis le stockage local
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  // Extraction de l'identifiant de l'utilisateur

  // Fonction pour gérer la suppression du compte utilisateur
  const handleDeleteAccount = async () => {
    // Utilisez window.confirm() pour demander une confirmation à l'utilisateur
    const userConfirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer votre compte ?"
    );

    if (!userConfirmed) {
      // L'utilisateur a annulé la suppression, ne faites rien
      return;
    }

    try {
      // Envoyer une requête pour supprimer le compte utilisateur en utilisant Axios
      const response = await axios.delete(
        `http://localhost:5000/users/${userId}`
      );

      // Ajouter ici la logique pour déconnecter l'utilisateur côté client si nécessaire

      // Afficher un message de succès ou rediriger l'utilisateur vers une page de confirmation, etc.
      console.log(response.data.message);

      // Rediriger l'utilisateur vers la page d'authentification après la suppression du compte
      navigate("/auth");
    } catch (error) {
      // Gérer les erreurs en cas d'échec de la suppression du compte
      console.error("Erreur lors de la suppression du compte :", error);
      // Afficher un message d'erreur ou prendre d'autres mesures en cas d'échec
    }
  };

  // Rendu du composant
  return (
    <div className="section_modif_donnees_accueil">
      <div className="section-modif-option-div">
        {/* Liens vers les pages de modification des données personnelles et du mot de passe */}
        <Link to="/homeco/modificationdonnees/edit">
          <div className="modif-option-div">
            <h2>Modifier les données personnelles</h2>
            <button>
              <FaChevronRight />
            </button>
          </div>
        </Link>
        <Link to="/homeco/modificationdonnees/editmp">
          <div className="modif-option-div">
            <h2>Modifier le mot de passe</h2>
            <button>
              <FaChevronRight />
            </button>
          </div>
        </Link>
        {/* Bouton pour déclencher la suppression du compte utilisateur */}
        <button className="deleteBtn" onClick={() => handleDeleteAccount()}>
          Supprimer le compte
        </button>
      </div>
    </div>
  );
}

// Export du composant PageModifDonne pour qu'il puisse être utilisé ailleurs dans l'application
export default PageModifDonne;
