import React from "react";
import NavBarIntro from "../../NavBarre/NavBarIntro";
import Footer from "../../Footer/Footer";

export default function MentionLegales() {
  return (
    <div className="mentionlegales">
        <NavBarIntro />
        <div className="mentionslegalessection">
      <h1>MENTIONS LÉGALES</h1>
      <p>
        Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour
        la confiance en l'économie numérique, il est précisé aux utilisateurs du
        site Padel Community l'identité des différents intervenants dans le
        cadre de sa réalisation et de son suivi.
      </p>
      <h2>Edition du site</h2>
      <p>
        Le présent site, accessible à l’URL www.padel-community.re (le « Site
        »), est édité par : Léo Segalini, résidant 7J Chemin Felicien Hibon
        97424 Piton Saint-Leu, de nationalité Française (France), né(e) le
        16/11/1995,
      </p>
      <h2>Hébergement</h2>
      <p>
        Le Site est hébergé par la société Infomaniak, situé Rue Eugène-Marziano
        25, 1227 Genève, Suisse, (contact téléphonique ou email : (+41) 22 820
        35 44).
      </p>
      <h2>Directeur de publication </h2>
      <p>Le Directeur de la publication du Site est Léo Segalini.</p>
      <h2>Nous contacter</h2>
      <p>
        <strong>Par téléphone :</strong> +33670963371
        <br /> <strong>Par email :</strong> leo.segalini@gmail.com <br />
        <strong>Par courrier :</strong> 7J Chemin Felicien Hibon 97424 Piton
        Saint-Leu
      </p>
      <h2>Données personnelles</h2>
      <p>
        Le traitement de vos données à caractère personnel est régi par notre
        Charte du respect de la vie privée, disponible depuis la section "Charte
        de Protection des Données Personnelles", conformément au Règlement
        Général sur la Protection des Données 2016/679 du 27 avril 2016
        («RGPD»).
      </p>
      </div>
      <Footer />
    </div>
  );
}
