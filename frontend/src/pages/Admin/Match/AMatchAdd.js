// Importation de React, useState et useEffect depuis react, et axios pour les requêtes HTTP
import React, { useState, useEffect } from "react";
import axios from "axios";

// Définition du composant fonctionnel AMatchAdd
export default function AMatchAdd() {
  // Fonction pour récupérer les données de l'utilisateur depuis le stockage local (localStorage)
  const utilisateurData = () => {
    const infoUser = JSON.parse(localStorage.getItem("user"));
    return infoUser;
  };

  // Affichage des données utilisateur dans la console
  console.log(utilisateurData());

  // Fonction pour obtenir la date du jour au format YYYY-MM-DD
  const getFormattedDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Fonction pour obtenir l'heure actuelle au format HH:MM
  const getFormattedTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Initialisation de l'état pour les données du match
  const [matchData, setMatchData] = useState({
    date: getFormattedDate(),
    heure: getFormattedTime(),
    personnesManquantes: 0,
    prixSession: 0,
    niveauMatch: 1,
    secteurLieu: "",
    terrain: "",
    clubPadel: "",
    utilisateur: {},
  });

  // Initialisation de l'état pour les terrains et les clubs filtrés
  const [terrains, setTerrains] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);

  // Initialisation des états pour les messages de succès et d'erreur
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Utilisation de useEffect pour récupérer les terrains depuis l'API au chargement du composant
  useEffect(() => {
    const fetchTerrains = async () => {
      try {
        const response = await axios.get("http://localhost:5000/terrains");
        setTerrains(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des terrains:", error);
      }
    };

    fetchTerrains();
  }, []);

  // Fonction pour gérer les changements dans les champs de saisie
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Si le champ modifié est "secteurLieu", filtrer les clubs en fonction de la valeur sélectionnée
    if (name === "secteurLieu") {
      const filteredClubs = terrains
        .filter((terrain) => terrain.secteurLieu === value)
        .map((terrain) => terrain.clubPadel.nomClub);

      setFilteredClubs(filteredClubs);
    }

    // Mettre à jour les données du match avec la nouvelle valeur
    setMatchData({
      ...matchData,
      [name]: value,
    });
  };

  // Fonction pour ajouter un nouveau match
  const handleAddMatch = async () => {
    try {
      // Récupérer les informations de l'utilisateur depuis le stockage local
      const user = utilisateurData();
      const selectedDate = new Date(matchData.date);
      const currentDate = new Date();

      // Vérifier si l'utilisateur est défini
      if (!user) {
        console.error("Utilisateur non défini.");
        return;
      }

      // Vérifier que la date du match est postérieure à la date actuelle
      if (selectedDate <= currentDate) {
        console.error(
          "La date doit être égale ou postérieure à la date actuelle."
        );
        return;
      }

      // Créer un objet avec les informations de l'utilisateur
      const utilisateurDatas = {
        nom: user.nom,
        photo: user.photo,
        email: user.email,
        telephone: user.telephone,
      };

      // Mettre à jour les données du match avec les informations de l'utilisateur
      const updatedMatchData = {
        ...matchData,
        utilisateur: utilisateurDatas,
      };

      // Faire une requête POST pour ajouter le match à l'API
      await axios.post("http://localhost:5000/matchs", updatedMatchData);

      // Afficher un message de succès
      setSuccessMessage("Le match a été ajouté avec succès !");
      setErrorMessage(null);
    } catch (error) {
      // En cas d'erreur, afficher un message d'erreur
      console.error("Erreur lors de l'ajout du match:", error);
      setErrorMessage("Erreur lors de l'ajout du match. Veuillez réessayer.");
      setSuccessMessage(null);
    }
  };

  // Rendu du composant avec du JSX
  return (
    <div className="Section_User_Edit">
      <div className="A_User_Edit">
        <h2>Ajouter un nouveau match</h2>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <div className="section_input_group">
          {/* Champs de saisie pour la date, l'heure, etc. */}
          <div className="input-group">
            <label htmlFor="date">Date:</label>
            <input
              id="date"
              className="input-field"
              type="date"
              name="date"
              value={matchData.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="hour">Heure:</label>
            <input
              id="hour"
              className="input-field"
              type="time"
              name="heure"
              value={matchData.heure}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="personneManquante">Personnes Manquantes:</label>
            <input
              id="personneManquante"
              className="input-field"
              type="number"
              name="personnesManquantes"
              value={matchData.personnesManquantes}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="priceSession">Prix de la Session:</label>
            <input
              id="priceSession"
              className="input-field"
              type="number"
              name="prixSession"
              value={matchData.prixSession}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="LvlMatch">Niveau de Match:</label>
            <input
              id="LvlMatch"
              className="input-field"
              type="number"
              name="niveauMatch"
              value={matchData.niveauMatch}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="SecteurLieu">Secteur Lieu:</label>
            <select
              id="SecteurLieu"
              className="input-field"
              name="secteurLieu"
              value={matchData.secteurLieu}
              onChange={handleInputChange}
            >
              <option value="">Choisissez un secteur...</option>
              <option value="Nord">Nord</option>
              <option value="Sud">Sud</option>
              <option value="Est">Est</option>
              <option value="Ouest">Ouest</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="ClubPadel">Club de Padel:</label>
            <select
              id="ClubPadel"
              className="input-field"
              name="clubPadel"
              value={matchData.clubPadel}
              onChange={handleInputChange}
            >
              <option value="">Choisissez un club de padel...</option>
              {filteredClubs.map((nomClub) => (
                <option key={nomClub} value={nomClub}>
                  {nomClub}
                </option>
              ))}
            </select>
          </div>
          {/* Champ de saisie pour le terrain */}
          <div className="input-group">
            <label htmlFor="terrain">Terrain:</label>
            <input
              id="terrain"
              className="input-field"
              type="text"
              name="terrain"
              value={matchData.terrain}
              onChange={handleInputChange}
            />
          </div>
          {/* Bouton pour ajouter le match */}
          <button onClick={() => handleAddMatch()} className="login-button">
            Ajouter Match
          </button>
        </div>
      </div>
    </div>
  );
}
