// Importation de React depuis la bibliothèque 'react'
import React from "react";

// Importation des styles CSS spécifiques à la barre de mentions légales
import "./MentionsBar.css";
import { Link } from "react-router-dom";

// Définition du composant fonctionnel MentionsBar
function MentionsBar() {
  return (
    // Structure principale du composant
    <div className="mention_section_bot">
      {/* Section de navigation pour les mentions légales */}
      <nav className="main-nav">
        <ul>
          {/* Élément de liste avec un lien vers la page des mentions légales */}
          <Link to="/mentionslegales">
            Mentions Légales
          </Link>
          {/* Élément de liste avec un lien vers la page des données personnelles */}
          <li>
            <a href="#">Données personnelles</a>
          </li>
          {/* Élément de liste avec un lien vers la page de gestion des cookies */}
          <li>
            <a href="#">Gestions cookies</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

// Exportation du composant MentionsBar par défaut
export default MentionsBar;
