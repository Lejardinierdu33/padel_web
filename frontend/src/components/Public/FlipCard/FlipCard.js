// Importation de React depuis la bibliothèque 'react'
import React from "react";

// Importation des styles CSS spécifiques au composant FlipCard
import "./FlipCard.css";

// Définition du composant fonctionnel FlipCard
function FlipCard() {
  return (
    // Structure principale du composant
    <div>
      {/* Section des terrains avec l'identifiant 'terrains' */}
      <section className="terrains-section" id="terrains">
        {/* Titre de la section des terrains */}
        <h1>Nos Terrains</h1>

        {/* Conteneur des cartes à retournement (flip card) */}
        <div className="flip-card-container">
          {/* Première carte à retournement pour le secteur "Nord" */}
          <div className="flip-card">
            {/* Contenu de la face avant de la carte */}
            <div className="flip-card-inner">
              <div className="flip-card-front">
                {/* Superposition (overlay) pour un effet visuel */}
                <div className="overlay"></div>
                {/* Texte indiquant le secteur "Nord" */}
                <p>Nord</p>
              </div>
              {/* Contenu de la face arrière de la carte */}
              <div className="flip-card-back">
                <div className="flip-card-back-nord">
                  {/* Contenu spécifique au secteur "Nord" */}
                  <p className="titre_flip_card">Contenu Nord</p>
                  <p className="description_flip_card">
                    Le Nord de La Réunion, entouré de paysages montagneux et de
                    sites naturels, offre un cadre idéal pour la pratique du
                    padel, un sport de raquette en plein essor. Entre montagnes
                    et plages, les amateurs de padel peuvent profiter d'une
                    expérience sportive unique dans un environnement
                    pittoresque.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Carte à retournement pour le secteur "Ouest" */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="overlay"></div>
                <p>Ouest</p>
              </div>
              <div className="flip-card-back">
                <div className="flip-card-back-ouest">
                  <p className="titre_flip_card">Contenu Ouest </p>
                  <p className="description_flip_card">
                    L'Ouest de La Réunion offre un cadre idyllique pour les
                    passionnés de padel. Entre les plages ensoleillées et les
                    installations sportives modernes, les joueurs de padel
                    peuvent profiter d'une expérience unique. Les clubs de padel
                    de l'Ouest proposent des tournois animés et des séances
                    d'entraînement avec vue sur l'océan Indien, créant ainsi un
                    mélange parfait entre sport et détente.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Carte à retournement pour le secteur "Sud" */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="overlay"></div>
                <p>Sud</p>
              </div>
              <div className="flip-card-back">
                <div className="flip-card-back-sud">
                  <p className="titre_flip_card">Contenu Sud</p>
                  <p className="description_flip_card">
                    Le Sud de La Réunion, avec son relief spectaculaire et son
                    volcan actif, offre un terrain de jeu aventureux pour les
                    amateurs de padel. Les terrains situés au pied du Piton de
                    la Fournaise offrent des défis uniques, et les joueurs
                    peuvent profiter de sessions palpitantes entourées par les
                    paysages volcaniques. Le padel devient une aventure sportive
                    au cœur de cette région dynamique.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Carte à retournement pour le secteur "Est" */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="overlay"></div>
                <p>Est</p>
              </div>
              <div className="flip-card-back">
                <div className="flip-card-back-est">
                  <p className="titre_flip_card">Contenu Est</p>
                  <p className="description_flip_card">
                    L'Est de La Réunion, riche en traditions créoles, apporte
                    une touche culturelle au monde du padel. Les clubs de padel
                    de l'Est intègrent des éléments de la culture locale dans
                    leurs installations, offrant aux joueurs une expérience
                    immersive. Entre deux matchs, les amateurs de padel peuvent
                    explorer les plantations de vanille et s'immerger dans la
                    riche histoire de la région. Le padel devient ainsi une
                    rencontre entre tradition et sport.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Exportation du composant FlipCard par défaut
export default FlipCard;
