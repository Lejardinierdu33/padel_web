// Import des modules nécessaires depuis React et d'autres bibliothèques
import React, { useState } from "react";
import "./ModifMp.css"; // Import du fichier de styles CSS
import axios from "axios"; // Import de la bibliothèque Axios pour effectuer des requêtes HTTP
import { useNavigate } from "react-router-dom"; // Import du hook useNavigate pour la navigation entre pages
// Import of eye and eye-slash icons from react-icons/fa
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Définition du composant fonctionnel ModifMp
function ModifMp() {
  // Récupération des informations utilisateur depuis le stockage local
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.userId; // Extraction de l'identifiant de l'utilisateur

  // Initialisation du navigateur pour la navigation entre pages
  const navigate = useNavigate();

  // Déclaration des états pour gérer les champs du formulaire et les messages d'erreur/succès
  const [oldPassword, setOldPassword] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Gestion des changements dans le champ de l'ancien mot de passe
  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  // Gestion des changements dans le champ du nouveau mot de passe
  const handleNewPasswordChange = (e) => {
    setMotDePasse(e.target.value);
  };

  // Gestion des changements dans le champ de confirmation du nouveau mot de passe
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Fonction de validation pour la modification du mot de passe
  const handleValidation = async () => {
    try {
      // Vérification si les nouveaux mots de passe correspondent
      if (motDePasse !== confirmPassword) {
        setError("Les nouveaux mots de passe ne correspondent pas.");
        return;
      }

      // Mise à jour complète du document utilisateur avec le nouveau mot de passe
      await axios.put(`http://localhost:5000/users/${userId}/update-password`, {
        oldPassword: oldPassword,
        motDePasse: motDePasse, // Mise à jour du mot de passe
      });

      // En cas de succès, affichage d'un message de succès
      setSuccessMessage("Mot de passe mis à jour avec succès.");

      // // Redirection vers la page d'authentification
      navigate("/auth");
    } catch (error) {
      console.error("Erreur lors de la validation du mot de passe :", error);
      setError(
        "Une erreur s'est produite lors de la validation du mot de passe."
      );
    }
  };

  // Rendu du composant
  return (
    <div className="modif-mp-container">
      <div className="form-section-modif-mp">
        {/* Champs de saisie pour l'ancien mot de passe, le nouveau mot de passe et la confirmation du nouveau mot de passe */}
        <div className="password-field">
          <h2>Ancien Mot de passe</h2>
          <input
            aria-label="password"
            type="password"
            value={oldPassword}
            onChange={handleOldPasswordChange}
          />
          {/* Icon for toggling password visibility */}
          {isPasswordVisible ? (
            <FaEyeSlash
              onClick={() => togglePasswordVisibility()}
              className="eye-icon"
            />
          ) : (
            <FaEye
              onClick={() => togglePasswordVisibility()}
              className="eye-icon"
            />
          )}
        </div>
        <div className="password-field">
          <h2>Nouveau Mot de passe</h2>
          <input
            aria-label="password"
            type="password"
            value={motDePasse}
            onChange={handleNewPasswordChange}
          />
          {/* Icon for toggling password visibility */}
          {isPasswordVisible ? (
            <FaEyeSlash
              onClick={() => togglePasswordVisibility()}
              className="eye-icon"
            />
          ) : (
            <FaEye
              onClick={() => togglePasswordVisibility()}
              className="eye-icon"
            />
          )}
        </div>
        <div className="password-field">
          <h2>Confirmer le Nouveau Mot de passe</h2>
          <input
            aria-label="password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {/* Icon for toggling password visibility */}
          {isPasswordVisible ? (
            <FaEyeSlash
              onClick={() => togglePasswordVisibility()}
              className="eye-icon"
            />
          ) : (
            <FaEye
              onClick={() => togglePasswordVisibility()}
              className="eye-icon"
            />
          )}
        </div>
        {/* Bouton pour déclencher la validation du changement de mot de passe */}
        <button onClick={() => handleValidation()} className="valider-button">
          Valider
        </button>
        {/* Affichage des messages d'erreur et de succès */}
        {error && <div className="error-message">{error}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      </div>
    </div>
  );
}

// Export du composant ModifMp pour qu'il puisse être utilisé ailleurs dans l'application
export default ModifMp;
