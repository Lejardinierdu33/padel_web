import React from "react";
import "./PopupResa.css";

// Composant PopupResa pour afficher les détails de réservation du match
export default function PopupResa({ match, onClose }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Réservation pour le match</h2>
        <p><strong>Nom et prénom :</strong> {match.utilisateur.nom}</p>
        <p><strong>Mail :</strong> <a href={`mailto:${match.utilisateur.email}`}>{match.utilisateur.email}</a></p>
        <p><strong>Téléphone :</strong> <a href={`tel:${match.utilisateur.telephone}`}>{match.utilisateur.telephone}</a></p>
        <p><strong>Date :</strong> {new Date(match.date).toLocaleDateString("fr-FR")}</p>
        <p><strong>Heure :</strong> {match.heure}</p>
        <p><strong>Club de Padel :</strong> {match.clubPadel}</p>
        <p><strong>Terrain de Padel :</strong> {match.terrain}</p>
        <p><strong>Prix de la session :</strong> {match.prixSession} €</p>
        <button onClick={() => onClose()}>Fermer</button>
      </div>
    </div>
  );
}
