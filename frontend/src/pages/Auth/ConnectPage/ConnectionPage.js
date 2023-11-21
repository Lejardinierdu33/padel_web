// Importation des modules nécessaires depuis React, les styles, et le service d'administration des comptes
import React, { useState } from "react";
import "./ConnectionPage.css"; // Importation des styles spécifiques au composant
import MentionsBar from "../../../components/Public/MentionsBar/MentionsBar"; // Importation du composant MentionsBar
import NavBarThird from "../../../components/Public/NavBarre/NavBarThird"; // Importation du composant NavBarThird
import { useNavigate } from "react-router-dom"; // Importation du hook useNavigate pour la navigation
import { accountService } from "../../../_services/account.service"; // Importation du service d'administration des comptes
import { FaEye } from 'react-icons/fa'

// Définition du composant ConnectionPage
const ConnectionPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); // Initialisation du hook de navigation
  const [loginAttempts, setLoginAttempts] = useState(0);
  // Déclaration de l'état pour les informations de connexion (email et mot de passe)
  const [credentials, setCredentials] = useState({
    email: "",
    motDePasse: "",
  });

  // Fonction pour mettre à jour l'état lorsqu'un champ du formulaire est modifié
  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // Fonction pour gérer la soumission du formulaire de connexion
  const onSubmit = (e) => {
    e.preventDefault();
   // Si le nombre d'échecs de connexion atteint 3, bloquer le compte
   if (loginAttempts >= 3) {
    setError("Compte bloqué. Veuillez contacter l'assistance.");
    return;
  }

  accountService
    .login(credentials)
    .then((res) => {
      console.log(res);
      console.log(res.data.role);
      console.log(res.data);

      localStorage.setItem("user", JSON.stringify(res.data));
      accountService.saveToken(res.data.token);
      if (res.data && res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/homeco");
      }
    })
    .catch((error) => {
      setLoginAttempts(loginAttempts + 1); // Incrémentez le compteur d'échecs de connexion
      setError("Identifiants invalides");
      console.error(error);
    });
  };
  // Rendu du composant avec du JSX
  return (
    <div>
      <NavBarThird /> {/* Affichage du composant NavBarThird */}
      <div className="container_connexion_section">
        <div className="login-box">
          <div className="header_connexion">
            <h2>Connexion</h2>
          </div>
          {error && <div className="error-message">{error}</div>}
          <form className="form_connexion" onSubmit={onSubmit}>
            {/* Champ de saisie pour l'email */}
            
            <input
            aria-label="email"
              type="email"
              className="input-field-co"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) =>onChange(e)}
              required
            />
            {/* Champ de saisie pour le mot de passe */}
            <input
            aria-label="password"
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              className="input-field-co"
              name="motDePasse"
              required
              value={credentials.motDePasse}
              onChange={(e) =>onChange(e)}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="show_password"
            >
              {showPassword ? <FaEye style={{ color: 'red' }}/> : <FaEye style={{ color: 'black' }}/>}
            </button>
            {/* Bouton de connexion */}
            <button type="submit" className="login-button">
              Connexion
            </button>
          </form>
        </div>
      </div>
      {/* Affichage du composant MentionsBar */}
      <MentionsBar />
    </div>
  );
};

export default ConnectionPage;
