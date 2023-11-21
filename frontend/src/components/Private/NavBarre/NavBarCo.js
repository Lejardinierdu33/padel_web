import React, { useEffect, useState } from "react";
import logo from "../../img/logo_padel-preview.webp";
import "./NavBarCo.css";
import { FaPlusCircle, FaBars, FaWindowClose } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { accountService } from "../../../_services/account.service";

function NavBarCo() {
  // État local pour stocker les informations de l'utilisateur
  const [user, setUser] = useState([]);

  // Utilisation de useEffect pour effectuer des opérations après le rendu initial
  useEffect(() => {
    const utilisateurData = async () => {
      try {
        // Récupération des données de l'utilisateur depuis le stockage local
        const response = await JSON.parse(localStorage.getItem("user"));
        // Mise à jour de l'état local avec les données de l'utilisateur
        setUser(response);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur", error);
      }
    };

    // Appel de la fonction utilisateurData
    utilisateurData();
  }, []);

  // Utilisation de l'hook useNavigate pour la navigation
  let navigate = useNavigate();

  // Fonction de déconnexion
  const logout = () => {
    // Appel de la fonction logout du service accountService
    accountService.logout();
    // Redirection vers la page d'authentification
    navigate("/auth");
    // Nettoyage du stockage local
    localStorage.clear();
  };

  const [isMenuClicked, setIsMenuClicked] = useState(false);

  useEffect(() => {
    const navBarIntroSection = document.querySelector(".navBarIntroSection");
    const navBarSectionCo = document.querySelector(".navBarSectionCo");
    const second_section_right_co = document.querySelector(
      ".second_section_right_co"
    );

    const iconLogoIntroCo = document.querySelector(".iconLogoIntroCo");

    if (navBarIntroSection) {
      if (isMenuClicked) {
        navBarIntroSection.classList.add("open");
        navBarSectionCo.classList.add("open");
        second_section_right_co.classList.add("open");
        iconLogoIntroCo.classList.add("open");
      } else {
        navBarIntroSection.classList.remove("open");
        navBarSectionCo.classList.remove("open");
        second_section_right_co.classList.remove("open");
        iconLogoIntroCo.classList.remove("open");
      }
    }
  }, [isMenuClicked]);

  const toggleMenu = () => {
    setIsMenuClicked(!isMenuClicked);
  };

  

  // Rendu du composant NavBarCo
  return (
    <div className="navBarSectionConnexion">
      <div className="navBarCo">
        <div className="iconLogoIntroCo">
          <img src={logo} alt="logo_img" />
        </div>
        <div className="second_section_right_co">
          <button onClick={() => toggleMenu()} className="burger_menu_co" aria-label="burger_menu">
            {isMenuClicked ? (
              <FaWindowClose style={{ fontSize: "30px", color: "red" }} aria-label="bar_nav"/>
            ) : (
              <FaBars style={{ fontSize: "30px", color: "blue" }} aria-label="close_nav"/>
            )}
          </button>
          <nav className="navBarIntroSection">
            <ul>
              {/* Utilisation du composant Link pour la navigation interne */}
              <Link to="/homeco" onClick={() => toggleMenu()}>
                Accueil
              </Link>
              <Link to="/homeco/modificationdonnees/index" onClick={() => toggleMenu()}>
                Mes données personnelles
              </Link>
              <Link to="/homeco/ajout_match">
                <FaPlusCircle
                  className="iconFaPlus"
                  style={{ color: "blue", marginRight: "5px" }}
                />
                Ajouter un match
              </Link>
            </ul>
          </nav>
          <div className="navBarSectionCo">
            <div className="top_left_section">
              {/* Affichage du nom de l'utilisateur et de sa photo */}
              <p className="nameId">{user.nom}</p>
              <img src={user.photo} alt="avatar icon" />
            </div>
            {/* Bouton de déconnexion avec gestion de l'événement onClick */}
            <button className="BtnLogOut" onClick={() => logout()}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBarCo;
