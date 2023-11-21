// Importez les dépendances nécessaires depuis React et votre service account
import React, { useState } from "react";
import "./FooterCo.css";
import { useNavigate } from "react-router-dom";
import { accountService } from "../../../_services/account.service";
import ContactUsPopup from "../PopupContactez_nous/PopupContact"; // Ajoutez cette ligne pour importer le nouveau composant ContactUsPopup

function FooterCo() {
  let navigate = useNavigate();

  // Déclaration de l'état pour gérer l'adresse e-mail dans le formulaire
  const [email, setEmail] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    reason: '',
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

  const logout = () => {
    accountService.logout();
    navigate("/auth");
    localStorage.clear();
  };

  // Fonction pour mettre à jour l'état de l'adresse e-mail lors de la saisie
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Fonction pour gérer l'inscription à la newsletter
  const handleNewsletterSignup = async () => {
    try {
      // Vérifier si l'adresse e-mail est valide avant de l'envoyer à la base de données
      if (email && /\S+@\S+\.\S+/.test(email)) {
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
    <div className="footer_section">
      <footer>
        <div className="footer-left">
          <nav>
            <ul>
              <li>
                <button onClick={() => setIsPopupOpen(true)} className="contactez_nous_btn">Contactez-nous</button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="footer-center">
          <button className="LogOutFooter" onClick={() => logout()}>
            Log out
          </button>
        </div>
        <div className="footer-right">
          <p>Restez informé de nos bons plans :</p>
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

export default FooterCo;
