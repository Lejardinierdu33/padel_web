// Import des modules nécessaires depuis React et d'autres bibliothèques
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import de la bibliothèque Axios pour effectuer des requêtes HTTP
import "./ModifDonne.css"; // Import du fichier de styles CSS

// Définition du composant fonctionnel ModifDonne
function ModifDonne() {
  // Récupération des informations utilisateur depuis le stockage local
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.userId;

  // Déclaration de l'état pour les informations de l'utilisateur en cours d'édition
  const [editedUser, setEditedUser] = useState([]);

  // Déclaration de l'état pour le message de succès après la mise à jour de l'utilisateur
  const [successMessage, setSuccessMessage] = useState("");

  // Utilisation de useEffect pour effectuer une action au montage du composant
  useEffect(() => {
    // Fonction asynchrone pour récupérer les informations de l'utilisateur depuis l'API
    const fetchUser = async () => {
      try {
        // Utilisation de l'ID extrait de l'URL pour obtenir les données de l'utilisateur
        const response = await axios.get(
          `http://localhost:5000/users/${userId}`
        );
        const userData = response.data;

        // Mise à jour de l'état avec les données de l'utilisateur
        setEditedUser({
          nom: userData.nom,
          prenom: userData.prenom,
          email: userData.email,
          telephone: userData.telephone,
          photo: userData.photo || "",
          niveauPadel: userData.niveauPadel || 1,
          secteurJeu:
            userData.secteurJeu || "Choississez votre secteur de jeu...",
          dateDeNaissance: userData.dateDeNaissance
            ? userData.dateDeNaissance.slice(0, 10)
            : "",
        });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur:",
          error
        );
      }
    };

    fetchUser();
  }, [userId]); // Le tableau dépendance indique que cette action dépend de l'ID et sera re-exécutée si l'ID change

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  // Fonction pour sauvegarder les modifications de l'utilisateur
  const handleSaveChanges = async () => {
    try {
      // Faites une requête PUT à votre API pour mettre à jour l'utilisateur
      await axios.put(`http://localhost:5000/users/${userId}`, editedUser);
      setSuccessMessage("Utilisateur mis à jour avec succès.");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    }
  };

  // Rendu du composant
  return (
    <div className="Section_User_Edit">
      <div className="A_User_Edit">
        <h2>Modifier l'utilisateur</h2>
        <div className="section_input_group">
          {/* Formulaire pour modifier les informations de l'utilisateur */}
          {/* Chaque champ est associé à une fonction de gestion des changements */}
          {/* Les valeurs des champs sont liées à l'état 'editedUser' */}
          <div className="input-group">
            <label htmlFor="prenom">Prénom:</label>
            <input
              id="prenom"
              type="text"
              name="prenom"
              className="input-field"
              value={editedUser.prenom}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="nom">Nom:</label>
            <input
              id="nom"
              type="text"
              name="nom"
              className="input-field"
              value={editedUser.nom}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              className="input-field"
              value={editedUser.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="telephone">Telephone:</label>
            <input
              id="telephone"
              className="input-field"
              name="telephone"
              type="tel"
              value={editedUser.telephone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="photo">Photo (URL):</label>
            <input
              id="photo"
              type="text"
              name="photo"
              className="input-field"
              value={editedUser.photo}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="niveauDePadel">Niveau de Padel:</label>
            <input
              id="niveauDePadel"
              type="number"
              name="niveauPadel"
              className="input-field"
              min="1"
              max="10"
              value={editedUser.niveauPadel}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="secteurDeJeu">Secteur de jeu:</label>
            <select
              id="secteurDeJeu"
              name="secteurJeu"
              className="input-field"
              value={editedUser.secteurJeu}
              onChange={handleInputChange}
            >
              <option value="">Choississez votre secteur de jeu...</option>
              <option value="Nord">Nord</option>
              <option value="Sud">Sud</option>
              <option value="Est">Est</option>
              <option value="Ouest">Ouest</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="datedenaissance">Date de naissance:</label>
            <input
              id="datedenaissance"
              type="date"
              name="dateDeNaissance"
              className="input-field"
              value={editedUser.dateDeNaissance}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* Bouton pour enregistrer les modifications */}
        <button onClick={() => handleSaveChanges()} className="login-button">
          Enregistrer les modifications
        </button>
        {/* Affichage du message de succès après la mise à jour */}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      </div>
    </div>
  );
}

// Export du composant ModifDonne pour qu'il puisse être utilisé ailleurs dans l'application
export default ModifDonne;
