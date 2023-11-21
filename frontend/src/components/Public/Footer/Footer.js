// Importation de React depuis la bibliothèque 'react'
import React, { useState } from "react";
// Importation des styles CSS spécifiques au composant Footer
import "./Footer.css";
import ContactUsPopup from "../../Private/PopupContactez_nous/PopupContact"; // Ajoutez cette ligne pour importer le nouveau composant ContactUsPopup

// Importation de Link depuis 'react-router-dom' pour créer des liens dans l'application React
import { Link } from "react-router-dom";
import { accountService } from "../../../_services/account.service";
const validator = require('validator');


// Définition du composant fonctionnel Footer
function Footer() {
  // Déclaration de l'état pour gérer l'adresse e-mail dans le formulaire
  const [email, setEmail] = useState("");

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    reason: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContactUs = async () => {
    // Ajoutez ici la logique pour gérer l'envoi du formulaire de contact
    console.log("Formulaire de contact envoyé:", formData);
    // Fermez le popup après l'envoi du formulaire
    setIsPopupOpen(false);
  };

  // Fonction pour mettre à jour l'état de l'adresse e-mail lors de la saisie
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Fonction pour gérer l'inscription à la newsletter
  const handleNewsletterSignup = async () => {
    try {
      // Vérifier si l'adresse e-mail est valide avant de l'envoyer à la base de données
      if (email && validator.isEmail(email)) {
        // Effectuer la requête HTTP POST pour enregistrer l'adresse e-mail
        await accountService.postNewsletter({ email });
        // Réinitialiser l'état de l'adresse e-mail après l'inscription réussie
        setEmail("");
        // Afficher un message ou déclencher une action supplémentaire si nécessaire
        console.log("Inscription réussie !");
      } else {
        console.log("Adresse e-mail non valide");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription à la newsletter", error);
    }
  };

  return (
    // Structure principale du composant
    <div className="footer_section">
      {/* Section du pied de page */}
      <footer>
        {/* Partie gauche du pied de page */}
        <div className="footer-left">
          <nav>
            <ul>
              {/* Élément de liste avec un lien vers la page de contact */}
              <li>
                <button
                  onClick={() => setIsPopupOpen(true)}
                  className="contactez_nous_btn"
                  id="contactez-nous"
                >
                  Contactez-nous
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Partie centrale du pied de page */}
        <div className="footer-center">
          {/* Bouton de connexion redirigeant vers la page de connexion */}
          <Link to="/auth">
            <button className="LogInFooter" id="logInFooter">
              Log in
            </button>
          </Link>
          {/* Bouton d'inscription redirigeant vers la page d'inscription */}
          <Link to="/signup">
            <button className="SignInFooter" id="SignInFooter">
              Sign in
            </button>
          </Link>
        </div>

        {/* Partie droite du pied de page */}
        <div className="footer-right">
          {/* Paragraphe informant les utilisateurs de rester informés */}
          <p>Restez informé de nos bons plans :</p>
          {/* Formulaire de newsletter avec un champ d'adresse e-mail et un bouton d'inscription */}
          <div className="newsletter">
            <input
              aria-label="email"
              type="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={handleEmailChange}
            />
            <button onClick={() => handleNewsletterSignup()}>S'inscrire</button>
          </div>
        </div>
      </footer>
      {/* Popup de contact */}
      {isPopupOpen && (
        <ContactUsPopup
          formData={formData}
          onClose={() => setIsPopupOpen(false)}
          setFormData={setFormData}
          onInputChange={handleInputChange}
          onSubmit={handleContactUs}
        />
      )}
    </div>
  );
}

// Exportation du composant Footer par défaut
export default Footer;
