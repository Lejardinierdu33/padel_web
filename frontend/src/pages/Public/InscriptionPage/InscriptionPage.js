import React, { useState } from "react";
import MentionsBar from "../../../components/Public/MentionsBar/MentionsBar";
import NavBarFour from "../../../components/Public/NavBarre/NavBarFour";
import { accountService } from "../../../_services/account.service";
import { FaEye } from "react-icons/fa";

function InscriptionPage() {
  // Déclaration des états pour les champs du formulaire et les messages de succès
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [afficherMotDePasse, setAfficherMotDePasse] = useState(false);
  const [photo, setPhoto] = useState("");
  const [niveauPadel, setNiveauPadel] = useState(1);
  const [secteurJeu, setSecteurJeu] = useState(
    "Choississez votre secteur de jeu..."
  );
  const [dateDeNaissance, setDateDeNaissance] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInscription = async (e) => {
    try {
      // Faites une requête POST à votre API pour ajouter l'utilisateur
      await accountService.postUsers({
        prenom,
        nom,
        email,
        telephone,
        motDePasse,
        photo,
        niveauPadel,
        secteurJeu,
        dateDeNaissance,
      });
      console.log("Utilisateur ajouté avec succès.");
      setSuccessMessage("Utilisateur ajouté avec succès.");
      // Réinitialisation des champs après l'ajout réussi
      setPrenom("");
      setNom("");
      setEmail("");
      setTelephone("");
      setMotDePasse("");
      setAfficherMotDePasse(false);
      setPhoto("");
      setNiveauPadel(1);
      setSecteurJeu("Nord");
      setDateDeNaissance("");
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur:", error);
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <NavBarFour />
      <div className="Section_User_Edit">
        <div className="A_User_Edit">
          <h2>Ajouter un utilisateur</h2>
          <div className="section_input_group">
            {/* Formulaire pour ajouter un utilisateur */}
            {/* Chaque champ est associé à un état et à une fonction de gestion des changements */}
            <div className="input-group">
              <label htmlFor="prenom">Prénom:</label>
              <input
                id="prenom"
                className="input-field"
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="nom">Nom:</label>
              <input
                id="nom"
                className="input-field"
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                className="input-field"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="telephone">Telephone:</label>
              <input
                id="telephone"
                className="input-field"
                type="tel"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="mot-de-passe">Mot de passe:</label>
              {/* Champ de mot de passe avec la possibilité de l'afficher/masquer */}
              <input
                id="mot-de-passe"
                className="input-field"
                type={afficherMotDePasse ? "text" : "password"}
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                required
              />
              <button
                onClick={() => setAfficherMotDePasse(!afficherMotDePasse)}
                className="mp_visuel"
                aria-label="show_password"
              >
                {/* Icône d'œil pour afficher/masquer le mot de passe */}
                {afficherMotDePasse ? (
                  <FaEye style={{ color: "red" }} />
                ) : (
                  <FaEye style={{ color: "black" }} />
                )}
              </button>
            </div>
            <div className="input-group">
              <label htmlFor="photo">Photo (URL):</label>
              <input
                id="photo"
                className="input-field"
                type="text"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="lvlpadel">Niveau de Padel:</label>
              <input
                id="lvlpadel"
                className="input-field"
                type="number"
                min="1"
                max="10"
                value={niveauPadel}
                onChange={(e) => setNiveauPadel(parseInt(e.target.value))}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="secteurdejeu">Secteur de jeu:</label>
              <select
                id="secteurdejeu"
                className="input-field"
                value={secteurJeu}
                onChange={(e) => setSecteurJeu(e.target.value)}
              >
                <option>Choississez votre secteur de jeu...</option>
                <option value="Nord">Nord</option>
                <option value="Sud">Sud</option>
                <option value="Est">Est</option>
                <option value="Ouest">Ouest</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="dateNaissance">Date de naissance:</label>
              <input
                id="dateNaissance"
                type="date"
                className="input-field"
                value={dateDeNaissance}
                onChange={(e) => setDateDeNaissance(e.target.value)}
                required
              />
            </div>
          </div>
          {/* Bouton pour ajouter un utilisateur */}
          <button onClick={() => handleInscription()} className="login-button">
            Ajouter Utilisateur
          </button>
          {/* Affichage du message de succès après l'ajout */}
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
        </div>
      </div>
      <MentionsBar />
    </div>
  );
}

export default InscriptionPage;
