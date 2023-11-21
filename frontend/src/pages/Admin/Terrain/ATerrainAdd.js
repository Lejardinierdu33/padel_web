// Importation de React et de useState depuis React, ainsi qu'axios
import React, { useState } from "react";
import axios from "axios";

// Définition du composant fonctionnel AClubPadelAdd
export default function AClubPadelAdd() {
  // Déclaration des états pour les différentes données du club de padel
  const [secteurLieu, setSecteurLieu] = useState("Sud");
  const [nomClub, setNomClub] = useState("");
  const [mailClub, setMailClub] = useState("");
  const [telClub, setTelClub] = useState("");
  const [adresseClub, setAdresseClub] = useState("");
  const [terrains, setTerrains] = useState([]);
  const [terrainNom, setTerrainNom] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fonction pour ajouter un nouveau terrain à la liste des terrains
  const handleAjouterTerrain = () => {
    if (terrainNom) {
      setTerrains([...terrains, { nom: terrainNom }]);
      setTerrainNom("");
    }
  };

  // Fonction pour modifier le nom d'un terrain dans la liste
  const handleModifierTerrain = (index, nouveauNom) => {
    const nouveauxTerrains = [...terrains];
    nouveauxTerrains[index].nom = nouveauNom;
    setTerrains(nouveauxTerrains);
  };

  // Fonction pour supprimer un terrain de la liste
  const handleSupprimerTerrain = (index) => {
    const nouveauxTerrains = [...terrains];
    nouveauxTerrains.splice(index, 1);
    setTerrains(nouveauxTerrains);
  };

  // Fonction pour ajouter un club de padel
  const handleAjouterClubPadel = async () => {
    try {
      // Vérifiez que les champs requis sont remplis
      if (!nomClub || !mailClub || !telClub || !adresseClub) {
        console.error("Tous les champs sont requis.");
        return;
      }

      // Vérifiez que le secteurLieu est une valeur valide
      if (!["Sud", "Nord", "Est", "Ouest"].includes(secteurLieu)) {
        console.error("Secteur de jeu invalide.");
        return;
      }

      // Faites la requête POST à votre API avec les données complètes (y compris les terrains)
      await axios.post("http://localhost:5000/terrains", {
        secteurLieu,
        clubPadel: {
          nomClub,
          mailClub,
          telClub,
          adresseClub,
          terrains,
        },
      });

      console.log("Club de padel ajouté avec succès.");
      setSuccessMessage("Club de padel ajouté avec succès.");

      // Réinitialisez les champs après l'ajout réussi
      setNomClub("");
      setMailClub("");
      setTelClub("");
      setAdresseClub("");
      setTerrains([]);
    } catch (error) {
      console.error("Erreur lors de l'ajout du club de padel:", error);
      setSuccessMessage("");
    }
  };

  // Rendu du composant avec du JSX
  return (
    <div className="Section_User_Edit">
      <div className="A_User_Edit">
        <h2>Ajouter un club de padel</h2>
        <div className="section_input_group">
          {/* Champs pour les différentes informations du club de padel */}
          <div className="input-group">
            <label htmlFor="nomClub">Nom du club:</label>
            <input
              id="nomClub"
              className="input-field"
              type="text"
              value={nomClub}
              onChange={(e) => setNomClub(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="emailClub">Email du club:</label>
            <input
              id="emailClub"
              className="input-field"
              type="email"
              value={mailClub}
              onChange={(e) => setMailClub(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="telephoneClub">Téléphone du club:</label>
            <input
              id="telephoneClub"
              className="input-field"
              type="tel"
              value={telClub}
              onChange={(e) => setTelClub(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="adresseClub">Adresse du club:</label>
            <input
              id="adresseClub"
              className="input-field"
              type="text"
              value={adresseClub}
              onChange={(e) => setAdresseClub(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="secteurJeu">Secteur de jeu:</label>
            {/* Champ de sélection du secteur de jeu */}
            <select
              id="secteurJeu"
              className="input-field"
              value={secteurLieu}
              onChange={(e) => setSecteurLieu(e.target.value)}
            >
              <option>Choisissez votre secteur de jeu...</option>
              <option value="Sud">Sud</option>
              <option value="Nord">Nord</option>
              <option value="Est">Est</option>
              <option value="Ouest">Ouest</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="terrains">Terrains:</label>
            {/* Champ pour le nom du terrain à ajouter */}
            <input
              id="terrains"
              className="input-field"
              type="text"
              value={terrainNom}
              onChange={(e) => setTerrainNom(e.target.value)}
              placeholder="Nom du terrain"
            />
            {/* Bouton pour ajouter le terrain */}
            <button onClick={() => handleAjouterTerrain()}>
              Ajouter Terrain
            </button>
            {/* Liste des terrains avec des boutons pour modifier et supprimer */}
            <ul>
              {terrains.map((terrain, index) => (
                <li key={index}>
                  {terrain.nom}{" "}
                  <button
                    onClick={() => {
                      const nouveauNom = prompt("Nouveau nom du terrain :");
                      if (nouveauNom !== null) {
                        handleModifierTerrain(index, nouveauNom);
                      }
                    }}
                  >
                    Modifier
                  </button>{" "}
                  <button onClick={() => handleSupprimerTerrain(index)}>
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Bouton pour ajouter le club de padel */}
        <button
          onClick={() => handleAjouterClubPadel()}
          className="login-button"
        >
          Ajouter Club de Padel
        </button>
        {/* Affichage du message de succès après l'ajout */}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      </div>
    </div>
  );
}
