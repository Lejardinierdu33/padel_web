import React from "react";
import "./PopupContact.css";
import { accountService } from "../../../_services/account.service";

export default function PopupContact({
  formData,
  setFormData,
  onClose,
  onInputChange,
}) {
  const onSubmit = async () => {
    try {
      // Effectuez une requête POST vers votre API côté serveur avec les données du formulaire
      const response = await accountService.postContact({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        reason: formData.reason,
      });

      // Si la requête est réussie, vous pouvez afficher un message ou effectuer d'autres actions
      console.log("Formulaire envoyé avec succès:", response.data);

      // Réinitialisez le formulaire après l'envoi réussi
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        reason: "",
      });

      // Fermez le popup après l'envoi réussi
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Contactez-nous</h2>
        <form>
          <label htmlFor="firstName">Prénom:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={onInputChange}
          />
          <label htmlFor="lastName">Nom:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={onInputChange}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
          />
          <label htmlFor="reason">Raison du contact:</label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={onInputChange}
          />
          <button
            type="button"
            onClick={() => onSubmit()}
            className="envoyer_btn_form"
          >
            Envoyer
          </button>
        </form>
        <button onClick={() => onClose()} className="close_btn_form">
          Fermer
        </button>
      </div>
    </div>
  );
}
