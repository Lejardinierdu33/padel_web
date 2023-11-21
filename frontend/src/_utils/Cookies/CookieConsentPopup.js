import React, { useState, useEffect } from "react";
import './CookieConsentPopup.css'

const CookieConsentPopup = () => {
  // État local pour contrôler l'affichage du popup
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà accepté ou refusé les cookies
    const hasAcceptedCookies = localStorage.getItem("cookiesAccepted");

    // Si les cookies n'ont ni été acceptés ni refusés, afficher le popup
    if (hasAcceptedCookies === null) {
      setShowPopup(true);
    }
  }, []);

  // Gérer l'acceptation des cookies
  const handleAcceptCookies = () => {
    // Définir un indicateur dans le stockage local indiquant que l'utilisateur a accepté les cookies
    localStorage.setItem("cookiesAccepted", "true");
    // Cacher le popup
    setShowPopup(false);
  };

  // Gérer le refus des cookies
  const handleRejectCookies = () => {
    // Définir un indicateur dans le stockage local indiquant que l'utilisateur a refusé les cookies
    localStorage.setItem("cookiesAccepted", "false");
    // Cacher le popup
    setShowPopup(false);
    // Supprimer les cookies existants (si applicable)
    // Remarque : C'est un exemple de base et peut nécessiter des ajustements en fonction de votre implémentation réelle des cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  };

  return (
    // Afficher le popup si showPopup est true
    showPopup && (
      <div className="cookie-popup">
        <p>
          Ce site web utilise des cookies pour vous assurer la meilleure expérience sur notre site.
        </p>
        <button onClick={handleAcceptCookies} className="validate_cookie">Accepter les cookies</button>
        <button onClick={handleRejectCookies} className="refuse_cookie">Refuser les cookies</button>
      </div>
    )
  );
};

export default CookieConsentPopup;
