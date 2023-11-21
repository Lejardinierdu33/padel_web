// Import des modules nécessaires depuis React et d'autres bibliothèques
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import de la bibliothèque Axios pour effectuer des requêtes HTTP

// Définition du composant fonctionnel CreateMatch
export default function CreateMatch() {
  // Fonction pour récupérer les informations de l'utilisateur depuis le stockage local
  const utilisateurData = () => {
    const infoUser = JSON.parse(localStorage.getItem("user"));
    return infoUser;
  };

  // Affichage des informations utilisateur dans la console
  console.log(utilisateurData());

  // Fonction pour obtenir la date formatée
  const getFormattedDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Fonction pour obtenir l'heure formatée
  const getFormattedTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Déclaration de l'état pour les données du match
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

  // Déclaration de l'état pour la liste des terrains
  const [terrains, setTerrains] = useState([]);

  // Déclaration de l'état pour les clubs filtrés en fonction du secteur
  const [filteredClubs, setFilteredClubs] = useState([]);

  // Déclaration de l'état pour le message de succès
  const [successMessage, setSuccessMessage] = useState(null);

  // Déclaration de l'état pour le message d'erreur
  const [errorMessage, setErrorMessage] = useState(null);

  // Utilisation de useEffect pour récupérer la liste des terrains au montage du composant
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

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Filtrer les clubs en fonction du secteur sélectionné
    if (name === "secteurLieu") {
      const filteredClubs = terrains
        .filter((terrain) => terrain.secteurLieu === value)
        .map((terrain) => terrain.clubPadel.nomClub);

      setFilteredClubs(filteredClubs);
    }

    // Mettre à jour les données du match
    setMatchData({
      ...matchData,
      [name]: value,
    });
  };

  // Fonction pour ajouter un nouveau match
  const handleAddMatch = async () => {
    try {
      // Obtenir les informations de l'utilisateur
      const user = utilisateurData();

      // Convertir la date du match en objet Date
      const selectedDate = new Date(matchData.date);
      const currentDate = new Date();

      // Vérifications avant l'ajout du match
      if (!user) {
        console.error("Utilisateur non défini.");
        return;
      }

      if (selectedDate <= currentDate) {
        console.error(
          "La date doit être égale ou postérieure à la date actuelle."
        );
        return;
      }

      // Données de l'utilisateur pour le match
      const utilisateurDatas = {
        nom: user.nom,
        photo: user.photo,
        email: user.email,
        telephone: user.telephone,
        id: user.userId,
      };

      // Mise à jour des données du match avec les informations de l'utilisateur
      const updatedMatchData = {
        ...matchData,
        utilisateur: utilisateurDatas,
      };

      // Envoi de la requête POST pour ajouter le match
      await axios.post("http://localhost:5000/matchs", updatedMatchData);
      setSuccessMessage("Le match a été ajouté avec succès !");
      setErrorMessage(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout du match:", error);
      setErrorMessage("Erreur lors de l'ajout du match. Veuillez réessayer.");
      setSuccessMessage(null);
    }
  };

  // Rendu du composant
  return (
    <div className="Section_User_Edit">
      <div className="A_User_Edit">
        <h2>Ajouter un nouveau match</h2>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <div className="section_input_group">
          {/* Formulaire pour ajouter un nouveau match */}
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
            <label htmlFor="personnemanquante">Personnes Manquantes:</label>
            <input
              id="personnemanquante"
              className="input-field"
              type="number"
              name="personnesManquantes"
              value={matchData.personnesManquantes}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="pricesession">Prix de la Session:</label>
            <input
              id="pricesession"
              className="input-field"
              type="number"
              name="prixSession"
              value={matchData.prixSession}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="lvlMatch">Niveau de Match:</label>
            <input
              id="lvlMatch"
              className="input-field"
              type="number"
              name="niveauMatch"
              value={matchData.niveauMatch}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="secteurLieu">Secteur Lieu:</label>
            <select
              id="secteurLieu"
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
            <label htmlFor="clubDePadel">Club de Padel:</label>
            <select
              id="clubDePadel"
              className="input-field"
              name="clubPadel"
              value={matchData.clubPadel.nomClub}
              onChange={handleInputChange}
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
          <button onClick={handleAddMatch} className="login-button">
            Ajouter Match
          </button>
        </div>
      </div>
    </div>
  );
}
