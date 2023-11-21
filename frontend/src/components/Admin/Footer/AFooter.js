import React from "react";
import "./AFooter.css";
import { useNavigate } from "react-router-dom";
import { accountService } from "../../../_services/account.service";

function FooterCo() {
  // Utilisation du hook useNavigate pour la navigation programmée
  let navigate = useNavigate();

  // Fonction de déconnexion
  const logout = () => {
    // Appel à la fonction logout du service accountService
    accountService.logout();
    // Navigation vers la page d'authentification
    navigate("/auth");
    // Nettoyage du stockage local (localStorage)
    localStorage.clear();
  };

  return (
    <div className="footer_section">
      <footer>
        {/* Section centrale du pied de page */}
        <div className="footer-center">
          {/* Bouton de déconnexion */}
          <button className="LogOutFooter" onClick={() => logout()}>
            Log out
          </button>
        </div>
      </footer>
    </div>
  );
}

export default FooterCo;
