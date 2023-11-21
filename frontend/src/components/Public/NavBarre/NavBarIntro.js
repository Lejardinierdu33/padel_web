// Importation de React depuis la bibliothèque 'react'
import React, { useEffect, useState } from "react";

// Importation de l'image du logo depuis le fichier local
import logo from "../../img/logo_padel-preview.webp";

// Importation des styles CSS spécifiques à la barre de navigation
import "./NavBarIntro.css";

// Importation du composant de lien de react-router-dom pour la navigation
import { Link } from "react-router-dom";

import { FaBars, FaWindowClose } from "react-icons/fa";

// Définition du composant fonctionnel NavBarIntro
function NavBarIntro() {
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  useEffect(() => {
    const navBarIntroSectionPublic = document.querySelector(
      ".navBarIntroSectionPublic"
    );
    const navBarIntroBtn = document.querySelector(".navBarIntroBtn");
    const iconLogoIntro = document.querySelector(".iconLogoIntro");
    const second_section_right = document.querySelector(
      ".second_section_right"
    );
    if (navBarIntroSectionPublic) {
      if (isMenuClicked) {
        navBarIntroSectionPublic.classList.add("open");
        navBarIntroBtn.classList.add("open");
        iconLogoIntro.classList.add("open");
        second_section_right.classList.add("open");
      } else {
        navBarIntroSectionPublic.classList.remove("open");
        navBarIntroBtn.classList.remove("open");
        iconLogoIntro.classList.remove("open");
        second_section_right.classList.remove("open");
      }
    }
  }, [isMenuClicked]);

  const toggleMenu = () => {
    setIsMenuClicked(!isMenuClicked);
  };

  return (
    // Structure principale du composant
    <div className="nav_section_all">
      <div className="navBarIntro">
        {/* Section pour afficher l'icône du logo */}
        <div className="iconLogoIntro">
          <img src={logo} alt="logo_img" loading="lazy" />
        </div>
        <div className="second_section_right">
          <button
            onClick={() => toggleMenu()}
            className="burger_menu"
            aria-label="burger_menu"
          >
            {isMenuClicked ? (
              <FaWindowClose
                style={{ fontSize: "30px", color: "red" }}
                loading="lazy"
              />
            ) : (
              <FaBars
                style={{ fontSize: "30px", color: "blue" }}
                loading="lazy"
              />
            )}
          </button>
          {/* Section de navigation avec des liens vers les sections Objectifs et Terrains */}
          <nav className="navBarIntroSectionPublic">
            <ul>
              <li>
                <a href="/#objectifs" onClick={() => toggleMenu()}>
                  Objectifs
                </a>
              </li>
              <li>
                <a href="/#terrains" onClick={() => toggleMenu()}>
                  Les terrains
                </a>
              </li>
            </ul>
          </nav>
          {/* Section pour afficher les boutons de connexion et d'inscription avec des liens vers les pages correspondantes */}
          <div className="navBarIntroBtn">
            <Link to="/auth">
              <button className="BtnLogIn" onClick={() => toggleMenu()}>
                Log In
              </button>
            </Link>
            <Link to="/signup">
              <button className="BtnSignIn" onClick={() => toggleMenu()}>
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Exportation du composant NavBarIntro par défaut
export default NavBarIntro;
