// Importation de React, useState, useEffect, Link, et des icônes FaTrash, FaPenSquare, FaUserPlus depuis react-icons/fa
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaPenSquare, FaFolderPlus } from "react-icons/fa";
import axios from "axios";

// Définition du composant fonctionnel ATerrain
export default function ATerrain() {
  // Déclaration des états pour les données des terrains, la suppression de terrains, le modal de suppression, l'ID du terrain sélectionné, le terme de recherche, et les terrains filtrés
  const [terrains, setTerrains] = useState([]);
  const [deleteTerrains, setDeleteTerrains] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTerrainId, setSelectedTerrainId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTerrains, setFilteredTerrains] = useState([]);

  // Utilisation de useEffect pour récupérer les terrains depuis l'API au chargement du composant
  useEffect(() => {
    const fetchTerrains = async () => {
      try {
        const response = await axios.get("http://localhost:5000/terrains");
        setTerrains(response.data);
        setFilteredTerrains(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des terrains:", error);
      }
    };

    fetchTerrains();
    setFilteredTerrains([]);
  }, []);

  // Fonction pour gérer la recherche de terrains en fonction d'un terme
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filteredTerrains = terrains.filter(
      (terrain) =>
        terrain.secteurLieu.toLowerCase().includes(searchTerm.toLowerCase()) ||
        terrain.clubPadel.nomClub
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        terrain.clubPadel.mailClub
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        terrain.clubPadel.telClub
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredTerrains(filteredTerrains);
  };

  // Fonction pour afficher tous les terrains
  const handleShowAllTerrains = () => {
    setFilteredTerrains(terrains);
    setSearchTerm("");
  };

  // Fonction pour filtrer les terrains par secteur
  const handleFilterBySector = (sector) => {
    const filteredTerrains = terrains.filter((terrain) =>
      terrain.secteurLieu.toLowerCase().includes(sector.toLowerCase())
    );
    setFilteredTerrains(filteredTerrains);
  };

  // Fonction pour supprimer un terrain
  const handleDeleteTerrain = async (terrainId) => {
    try {
      await axios.delete(`http://localhost:5000/terrains/${terrainId}`);
      const updatedTerrains = terrains.filter(
        (terrain) => terrain._id !== terrainId
      );
      setTerrains(updatedTerrains);
      setDeleteTerrains("Terrain supprimé avec succès.");
      setShowDeleteModal(false);
      setTimeout(() => {
        setDeleteTerrains("");
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la suppression du terrain:", error);
      setDeleteTerrains("Erreur lors de la suppression du terrain.");
      setShowDeleteModal(false);
      setTimeout(() => {
        setDeleteTerrains("");
      }, 3000);
    }
  };

  // Rendu du composant avec du JSX
  return (
    <div className="A_Terrain">
      <div className="section_user_index">
        <div className="A_User">
          <div className="search-bar">
            {/* Champ de recherche avec bouton pour afficher tous les terrains */}
            <input
              aria-label="searchTerrain"
              type="text"
              placeholder="Rechercher par secteur..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <button onClick={() => handleShowAllTerrains()}>
              Voir tous les terrains
            </button>
          </div>
          {/* Boutons de filtre par secteur */}
          <div className="filter-buttons">
            <button onClick={() => handleFilterBySector("Nord")}>Nord</button>
            <button onClick={() => handleFilterBySector("Sud")}>Sud</button>
            <button onClick={() => handleFilterBySector("Est")}>Est</button>
            <button onClick={() => handleFilterBySector("Ouest")}>Ouest</button>
            <button
              onClick={() => handleShowAllTerrains()}
              className="reinitialiser-btn"
            >
              Réinitialiser
            </button>
          </div>

          <div className="A_User_Section">
            {/* Bouton pour ajouter un terrain */}
            <Link to="/admin/terrains/add" className="add_btn_user">
              <FaFolderPlus style={{ color: "#f7941d", fontSize: "50px" }} aria-label="add_terrain"/>
            </Link>
            {/* Message de suppression */}
            {deleteTerrains && (
              <div className="delete-message">{deleteTerrains}</div>
            )}
            {/* Modal de suppression */}
            {showDeleteModal && (
              <div className="modal">
                <p>Voulez-vous vraiment supprimer ce terrain ?</p>
                {/* Bouton pour confirmer la suppression */}
                <button
                  onClick={() => handleDeleteTerrain(selectedTerrainId)}
                  className="yes_btn"
                >
                  Oui
                </button>
                {/* Bouton pour annuler la suppression */}
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="no_btn"
                >
                  Non
                </button>
              </div>
            )}
            {/* Affichage des terrains sous forme de cartes */}
            <div className="Card_user_admin">
              {filteredTerrains.map((terrain) => (
                <div key={terrain._id} className="user-card">
                  <h2>{terrain.secteurLieu}</h2>
                  <p>{terrain.clubPadel.nomClub}</p>
                  <p>
                    <strong>Téléphone:</strong> {terrain.clubPadel.telClub}
                  </p>
                  <p>
                    <strong>Email:</strong> {terrain.clubPadel.mailClub}
                  </p>
                  {/* Icônes pour supprimer et éditer le terrain */}
                  <div className="icon_user_btn">
                    <FaTrash
                      onClick={() => {
                        setSelectedTerrainId(terrain._id);
                        setShowDeleteModal(true);
                      }}
                      style={{
                        cursor: "pointer",
                        color: "red",
                        fontSize: "30px",
                      }}
                    />
                    <Link to={`/admin/terrains/edit/${terrain._id}`}>
                      <FaPenSquare
                        style={{
                          cursor: "pointer",
                          color: "blue",
                          fontSize: "30px",
                        }}
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
