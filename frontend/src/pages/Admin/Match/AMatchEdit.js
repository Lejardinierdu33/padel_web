// Importation des modules nécessaires depuis React, axios, et react-router-dom
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// Définition du composant fonctionnel AMatchEdit
export default function AMatchEdit() {
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

  // Récupération de l'ID du match à partir des paramètres de l'URL
  const { id } = useParams();

  // Initialisation de l'état pour les données du match édité
  const [editedMatch, setEditedMatch] = useState({
    date: getFormattedDate(),
    heure: getFormattedTime(),
    personnesManquantes: 0,
    prixSession: 0,
    niveauMatch: 1,
    secteurLieu: "",
    clubPadel: "",
    terrain: "", // Ce champ devrait être un tableau d'identifiants de terrains
  });

  // Initialisation des états pour les messages de succès et d'erreur
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Initialisation des états pour les terrains, les clubs, et les clubs filtrés
  const [terrains, setTerrains] = useState("");
  const [clubs, setClubs] = useState("");
  const [filteredClubs, setFilteredClubs] = useState([]);

  // Utilisation de useEffect pour récupérer les données du match à éditer depuis l'API
  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/matchs/${id}`);
        const matchData = response.data;

        // Formatage de la date au format 'yyyy-MM-dd'
        const formattedDate = new Date(matchData.date)
          .toISOString()
          .split("T")[0];

        // Ajout de la logique pour récupérer le nom du club à partir de l'ID
        const clubPadelNom = matchData.clubPadel
          ? matchData.clubPadel.nomClub
          : "";

        // Mise à jour de l'état avec les données du match
        setEditedMatch({
          date: formattedDate,
          heure: matchData.heure,
          personnesManquantes: matchData.personnesManquantes,
          prixSession: matchData.prixSession,
          niveauMatch: matchData.niveauMatch,
          secteurLieu: matchData.secteurLieu,
          clubPadel: clubPadelNom, // Utilisation du nom du club
          terrain: matchData.terrains, // Utilisation du nom du terrain
        });
      } catch (error) {
        console.error("Erreur lors de la récupération du match:", error);
        setErrorMessage("Erreur lors de la récupération du match.");
      }
    };

    fetchMatch();
  }, [id]);

  // Utilisation de useEffect pour récupérer la liste des terrains depuis l'API
  useEffect(() => {
    const fetchTerrains = async () => {
      try {
        const response = await axios.get("http://localhost:5000/terrains");
        setTerrains(response.data);

        // Extraire la liste unique des clubs de padel
        const uniqueClubs = [
          ...new Set(
            response.data.map((terrain) => terrain.clubPadel?.nomClub)
          ),
        ];
        setClubs(uniqueClubs);
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
    setEditedMatch({
      ...editedMatch,
      [name]: value,
    });
  };

  // Fonction pour sauvegarder les modifications du match
  const handleSaveChanges = async () => {
    try {
      // Faire la requête PUT à l'API avec les modifications
      await axios.put(`http://localhost:5000/matchs/${id}`, editedMatch);
      setSuccessMessage("Match mis à jour avec succès.");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du match:", error);
      setErrorMessage("Erreur lors de la mise à jour du match.");
    }
  };

  // Rendu du composant avec du JSX
  return (
    <div className="Section_User_Edit">
      <div className="A_User_Edit">
        <h2>Modifier le match</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="section_input_group">
          {/* Champs de saisie pour la date, l'heure, etc. */}
          <div className="input-group">
            <label htmlFor="date">Date:</label>
            <input
              id="date"
              type="date"
              name="date"
              value={editedMatch.date}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="hour">Heure:</label>
            <input
              id="hour"
              type="time"
              name="heure"
              value={editedMatch.heure}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="personneManquante">Personnes Manquantes:</label>
            <input
              id="personneManquante"
              type="number"
              name="personnesManquantes"
              value={editedMatch.personnesManquantes}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="priceSession">Prix de la Session:</label>
            <input
              id="priceSession"
              type="number"
              name="prixSession"
              value={editedMatch.prixSession}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="LvlMatch">Niveau de Match:</label>
            <input
              id="LvlMatch"
              type="number"
              name="niveauMatch"
              value={editedMatch.niveauMatch}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="SecteurLieu">Secteur Lieu:</label>
            <select
              id="SecteurLieu"
              name="secteurLieu"
              value={editedMatch.secteurLieu}
              onChange={handleInputChange}
              className="input-field"
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
              name="clubPadel"
              value={editedMatch.clubPadel}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="">Choisissez un club de padel...</option>
              {filteredClubs.map((club) => (
                <option key={club} value={club}>
                  {club}
                </option>
              ))}
            </select>
          </div>
          {/* Champ de saisie pour le terrain */}
          <div className="input-group">
            <label htmlFor="Terrain">Terrain:</label>
            <input
              id="Terrain"
              className="input-field"
              type="text"
              name="terrain"
              value={editedMatch.terrains}
              onChange={handleInputChange}
            />
          </div>
          {/* Bouton pour enregistrer les modifications */}
          <button onClick={() => handleSaveChanges()} className="login-button">
            Enregistrer les modifications
          </button>
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
}
