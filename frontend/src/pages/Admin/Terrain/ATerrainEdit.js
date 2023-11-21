// Importation de React, du hook useState, du hook useEffect et de useParams depuis React, ainsi que d'axios
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Définition du composant fonctionnel ATerrainEdit
export default function ATerrainEdit() {
  // Extraction de l'ID de l'URL à l'aide du hook useParams
  const { id } = useParams();

  // Déclaration de l'état pour les informations du terrain en cours d'édition
  const [editedTerrain, setEditedTerrain] = useState({
    secteurLieu: "Nord",
    clubPadel: {
      nomClub: "",
      mailClub: "",
      telClub: "",
      adresseClub: "",
      terrains: [],
    },
  });

  // Déclaration de l'état pour le nouveau terrain à ajouter
  const [newTerrain, setNewTerrain] = useState("");

  // Déclaration de l'état pour le message de succès après la mise à jour du terrain
  const [successMessage, setSuccessMessage] = useState("");

  // Déclaration de l'état pour le message d'erreur en cas de problème lors de la mise à jour du terrain
  const [errorMessage, setErrorMessage] = useState("");

  // Utilisation de useEffect pour effectuer une action au montage du composant
  useEffect(() => {
    // Fonction asynchrone pour récupérer les informations du terrain depuis l'API
    const fetchTerrain = async () => {
      try {
        // Utilisation de l'ID extrait de l'URL pour obtenir les données du terrain
        const response = await axios.get(
          `http://localhost:5000/terrains/${id}`
        );
        const terrainData = response.data;

        // Mise à jour de l'état avec les données du terrain
        setEditedTerrain({
          secteurLieu: terrainData.secteurLieu,
          clubPadel: {
            nomClub: terrainData.clubPadel.nomClub,
            mailClub: terrainData.clubPadel.mailClub,
            telClub: terrainData.clubPadel.telClub,
            adresseClub: terrainData.clubPadel.adresseClub,
            terrains: terrainData.clubPadel.terrains,
          },
        });
      } catch (error) {
        console.error("Erreur lors de la récupération du terrain:", error);
        setErrorMessage("Erreur lors de la récupération du terrain.");
      }
    };

    fetchTerrain();
  }, [id]); // Le tableau de dépendance indique que cette action dépend de l'ID et sera re-exécutée si l'ID change

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTerrain({
      ...editedTerrain,
      [name]: value,
    });
  };

  // Fonction pour ajouter un nouveau terrain à la liste
  const handleAjouterTerrain = () => {
    if (newTerrain) {
      const nouveauTerrain = { nom: newTerrain };
      setEditedTerrain((prevState) => ({
        ...prevState,
        clubPadel: {
          ...prevState.clubPadel,
          terrains: [...prevState.clubPadel.terrains, nouveauTerrain],
        },
      }));
      setNewTerrain(""); // Réinitialiser le champ pour le prochain ajout
    }
  };

  // Fonction pour supprimer un terrain de la liste
  const handleSupprimerTerrain = (index) => {
    const nouveauxTerrains = [...editedTerrain.clubPadel.terrains];
    nouveauxTerrains.splice(index, 1);
    setEditedTerrain({
      ...editedTerrain,
      clubPadel: {
        ...editedTerrain.clubPadel,
        terrains: nouveauxTerrains,
      },
    });
  };

  // Fonction pour sauvegarder les modifications du terrain
  const handleSaveChanges = async () => {
    try {
      // Faites une requête PUT à votre API pour mettre à jour le terrain
      await axios.put(`http://localhost:5000/terrains/${id}`, editedTerrain);
      setSuccessMessage("Terrain mis à jour avec succès.");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du terrain:", error);
      setErrorMessage("Erreur lors de la mise à jour du terrain.");
    }
  };

  // Rendu du composant avec du JSX
  return (
    <div className="Section_User_Edit">
      <div className="A_User_Edit">
        <h2>Modifier le terrain</h2>
        {/* Affichage du message d'erreur en cas de problème */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="section_input_group">
          <div className="input-group">
            <label htmlFor="secteurLieu">Secteur Lieu:</label>
            {/* Champ de sélection du secteur du terrain */}
            <select
              id="secteurLieu"
              name="secteurLieu"
              value={editedTerrain.secteurLieu}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="">Choississez un secteur...</option>
              <option value="Nord">Nord</option>
              <option value="Sud">Sud</option>
              <option value="Est">Est</option>
              <option value="Ouest">Ouest</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="nomClub">Nom du club:</label>
            {/* Champ pour le nom du club */}
            <input
              id="nomClub"
              type="text"
              name="nomClub"
              className="input-field"
              value={editedTerrain.clubPadel.nomClub}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="emailClub">Email du club:</label>
            {/* Champ pour l'email du club */}
            <input
              id="emailClub"
              type="email"
              name="mailClub"
              className="input-field"
              value={editedTerrain.clubPadel.mailClub}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="telClub">Téléphone du club:</label>
            {/* Champ pour le téléphone du club */}
            <input
              id="telClub"
              type="tel"
              name="telClub"
              className="input-field"
              value={editedTerrain.clubPadel.telClub}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="adressClub">Adresse du club:</label>
            {/* Champ pour l'adresse du club */}
            <input
              id="adressClub"
              type="text"
              name="adresseClub"
              className="input-field"
              value={editedTerrain.clubPadel.adresseClub}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="terrains">Terrains existants:</label>
            {/* Liste des terrains existants */}
            <ul>
              {editedTerrain.clubPadel.terrains.map((terrain, index) => (
                <li key={index}>
                  {terrain.nom}{" "}
                  <button onClick={() => handleSupprimerTerrain(index)}>
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="input-group">
            <label htmlFor="newTerrain">Nouveau Terrain:</label>
            {/* Champ pour le nouveau terrain à ajouter */}
            <input
              id="newTerrain"
              type="text"
              className="input-field"
              value={newTerrain}
              onChange={(e) => setNewTerrain(e.target.value)}
            />
            {/* Bouton pour ajouter le nouveau terrain */}
            <button onClick={() => handleAjouterTerrain()}>
              Ajouter Terrain
            </button>
          </div>
        </div>
        {/* Bouton pour enregistrer les modifications */}
        <button onClick={() => handleSaveChanges} className="login-button">
          Enregistrer les modifications
        </button>
        {/* Affichage du message de succès après la mise à jour */}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      </div>
    </div>
  );
}
