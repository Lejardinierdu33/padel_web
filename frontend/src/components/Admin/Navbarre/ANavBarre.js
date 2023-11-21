import React from "react";
import './ANavBarre.css';
import { Link, useNavigate } from "react-router-dom";
import { accountService } from "../../../_services/account.service";

export default function ANavBarre() {
  // Utilisation du hook useNavigate pour la navigation programmée
  let navigate = useNavigate()

  // Fonction de déconnexion
  const logout = () => {
    // Appel à la fonction logout du service accountService
    accountService.logout();
    // Navigation vers la page d'authentification
    navigate('/auth');
    // Nettoyage du stockage local (localStorage)
    localStorage.clear();
  };

  // Rendu du composant ANavBarre
  return (
    <div className="section_admin_navbar">
      <div className="admin-navbar">
        {/* Section gauche de la barre de navigation */}
        <div className="admin-navbar-left">
          {/* Lien vers le tableau de bord */}
          <Link className="admin-nav-button" to="dashboard">Dashboard</Link>
        </div>
        {/* Section droite de la barre de navigation */}
        <div className="admin-navbar-right">
          {/* Bouton de déconnexion avec l'événement onClick associé à la fonction logout */}
          <button className="admin-nav-button" onClick={() =>logout()}>Log Out</button>
        </div>
      </div>
    </div>
  );
}
