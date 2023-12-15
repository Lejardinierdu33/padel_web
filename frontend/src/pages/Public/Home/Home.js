import React from "react";
import NavBarIntro from "../../../components/Public/NavBarre/NavBarIntro";
import imgObjectif from "../../img/homme_search.webp";
import "./Home.css";
import Footer from "../../../components/Public/Footer/Footer";
import FlipCard from "../../../components/Public/FlipCard/FlipCard";
import CookieConsentPopup from "../../../_utils/Cookies/CookieConsentPopup";
import { Link } from "react-router-dom";

function Home() {

  return (
    // Section principale de la page d'accueil
    <div className="homeIntroSection">
      {/* Barre de navigation en haut de la page */}
      <NavBarIntro />
      
      {/* En-tête de la page */}
      <header className="header">
        <div className="overlay_header"></div>
        <div className="header-content">
          <h1>
            Plus qu’un site,
            <br /> une communauté 🎾
          </h1>
          <div id="objectifs"></div>
        </div>
      </header>

      {/* Section des objectifs */}
      <section className="objectifs-section">
        <h1>Nos Objectifs</h1>
        <div className="objectifs-content">
          {/* Image illustrant les objectifs */}
          <div className="objectifs-image">
            <img src={imgObjectif} alt="Padel_Image_Section" loading="lazy"/>
          </div>
          
          {/* Texte décrivant les objectifs */}
          <div className="objectifs-text">
            <p>
              Arrêtez de chercher n’importe où des coéquipiers, nous sommes là !
              <br />
              À travers ce site, nous souhaitons créer une communauté autour d’un
              sport commun, le padel. Il arrive souvent qu'on ait du mal à trouver 4
              joueurs pour faire des parties ; ici, vous pourrez rencontrer
              d’autres passionnés et vous réunir autour d’un terrain pour
              échanger quelques balles !<br />
              <br /> Chaque personne aura un espace personnel dans lequel elle
              pourra indiquer sa disponibilité ou trouver un groupe en
              recherche de partenaire. Vous aurez la possibilité de rechercher
              des terrains en fonction du secteur où vous souhaitez jouer. Vous
              pourrez également mettre en favoris des terrains pour recevoir des
              mails vous indiquant un groupe en recherche de partenaire dans
              votre secteur et bien plus !<br />
              <br /> Donc n’hésitez plus et<Link to={'/signup'}><button id="lancez_vous">lancez-vous !</button></Link>
            </p>
          </div>
        </div>
      </section>
      
      {/* Composant FlipCard */}
      <FlipCard />
      
      {/* Pied de page */}
      <Footer />
      
      {/* Popup de consentement pour les cookies */}
      <CookieConsentPopup />
    </div>
  );
}

export default Home;
