// Importations des dépendances nécessaires depuis React et les bibliothèques externes
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaPenSquare, FaTableTennis } from "react-icons/fa";
import { accountService } from "../../../_services/account.service";

// Fonction principale du composant AMatch
export default function AMatch() {
  // États locaux utilisés pour gérer les données et le comportement du composant
  const [matchs, setMatchs] = useState([]); // État pour stocker la liste des matchs
  const [searchTerm, setSearchTerm] = useState(""); // État pour gérer le terme de recherche
  const [selectedZone, setSelectedZone] = useState(""); // État pour gérer la zone sélectionnée
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(""); // État pour gérer le créneau horaire sélectionné
  const [selectedLevel, setSelectedLevel] = useState(""); // État pour gérer le niveau sélectionné
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Contrôle de l'affichage du modal de suppression
  const [deleteMessage, setDeleteMessage] = useState(""); // Message de confirmation de suppression
  const [selectedMatchId, setSelectedMatchId] = useState(null); // ID de l'utilisateur sélectionné pour la suppression

  // Effet useEffect pour charger les matchs au montage du composant
  useEffect(() => {
    // Fonction asynchrone pour récupérer les matchs depuis le service
    const fetchMatches = async () => {
      try {
        const response = await accountService.getMatchs();
        setMatchs(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des matchs:", error);
      }
    };

    // Appel de la fonction de récupération des matchs
    fetchMatches();
  }, []); // Le tableau vide en tant que dépendance signifie que cet effet s'exécute une seule fois au montage du composant

  // Fonction pour gérer la suppression d'un match
  const handleDeleteMatch = async (matchId) => {
    try {
      // Appel du service de suppression de match
      await accountService.deleteMatchs(matchId);
      // Filtrage des matchs pour exclure celui qui vient d'être supprimé
      const updatedMatchs = matchs.filter((match) => match._id !== matchId);
      // Mise à jour de l'état avec la nouvelle liste de matchs
      setMatchs(updatedMatchs);
      // Affichage du message de suppression réussie
      setDeleteMessage("Match supprimé avec succès.");
      // Masquage du modal de suppression
      setShowDeleteModal(false);
      // Suppression du message après 3 secondes
      setTimeout(() => {
        setDeleteMessage("");
      }, 3000);
      console.log(`Match avec l'ID ${matchId} supprimé.`);
    } catch (error) {
      console.error("Erreur lors de la suppression du match:", error);
      // Affichage du message en cas d'erreur de suppression
      setDeleteMessage("Erreur lors de la suppression du match.");
      // Masquage du modal de suppression
      setShowDeleteModal(false);
      // Suppression du message après 3 secondes en cas d'erreur
      setTimeout(() => {
        setDeleteMessage("");
      }, 3000);
    }
  };

  // Rendu JSX du composant
  return (
    <div className="A_Terrain">
      <div className="section_user_index">
        <div className="A_User">
          <div className="A_Match_Section">
            {/* Section de filtres pour la recherche et la sélection */}
            <div className="filter-section">
              <input
                aria-label="searchMatch"
                type="text"
                placeholder="Rechercher..."
                className="search-input-match"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                aria-label="selecteZone"
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
              >
                <option value="">Toutes les zones</option>
                <option value="Nord">Nord</option>
                <option value="Sud">Sud</option>
                <option value="Est">Est</option>
                <option value="Ouest">Ouest</option>
              </select>
              <select
                aria-label="selectedTime"
                value={selectedTimeSlot}
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
              >
                <option value="">Tous les créneaux</option>
                <option value="morning">Matin (8:00 - 12:00)</option>
                <option value="afternoon">Après-midi (12:01 - 17:00)</option>
                <option value="evening">Soir (17:01 - 22:00)</option>
              </select>
              <select
                aria-label="selecteLvl"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="">Tous les niveaux</option>
                <option value="1-2">1-2</option>
                <option value="3-5">3-5</option>
                <option value="6-8">6-8</option>
                <option value="9-10">9-10</option>
              </select>
            </div>
            {/* Bouton d'ajout d'un nouveau match */}
            <Link to="/admin/matchs/add" className="add_btn_user">
              <FaTableTennis style={{ color: "#f7941d", fontSize: "50px" }} aria-label="add_match"/>
            </Link>
            {/* Affichage du message de suppression et du modal de confirmation */}
            {deleteMessage && (
              <div className="delete-message">{deleteMessage}</div>
            )}
            {showDeleteModal && (
              <div className="modal">
                <p>Voulez-vous vraiment supprimer ce match ?</p>
                {/* Bouton pour confirmer la suppression */}
                <button
                  onClick={() => {
                    handleDeleteMatch(selectedMatchId);
                  }}
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
            {/* Section d'affichage des cartes de matchs */}
            <div className="Card_match_admin">
              {matchs
                .filter((match) =>
                  match.date.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .filter((match) =>
                  selectedZone ? match.secteurLieu === selectedZone : true
                )
                .filter((match) => {
                  const matchTime = parseInt(match.heure.split(":")[0], 10);
                  if (selectedTimeSlot === "morning")
                    return matchTime >= 8 && matchTime <= 12;
                  if (selectedTimeSlot === "afternoon")
                    return matchTime > 12 && matchTime <= 17;
                  if (selectedTimeSlot === "evening")
                    return matchTime > 17 && matchTime <= 22;
                  return true;
                })
                .filter((match) => {
                  if (selectedLevel) {
                    const [min, max] = selectedLevel.split("-").map(Number);
                    return match.niveauMatch >= min && match.niveauMatch <= max;
                  }
                  return true;
                })
                .map((match) => {
                  // Utilisation de la classe Date pour formater la date
                  const formattedDate = new Date(match.date).toLocaleDateString(
                    "fr-FR"
                  );

                  return (
                    <div key={match._id} className="match-card">
                      {/* Section du haut */}
                      <div className="match-top-section">
                        <div className="club-name">{match.clubPadel}</div>
                        <div className="match-level">
                          Niveau du match :{match.niveauMatch}
                        </div>
                      </div>

                      {/* Section du centre */}
                      <div className="match-center-section">
                        <div className="match-date">{formattedDate}</div>
                        <div className="match-hour">{match.heure}</div>
                        <div className="missing-players">
                          {match.personnesManquantes} places
                        </div>
                        <div className="price-per-person">
                          {match.prixSession}€/pers
                        </div>
                      </div>

                      {/* Section du bas */}
                      <div className="match-bottom-section_admin">
                        <div className="icon_match_btn">
                          <FaTrash
                            onClick={() => {
                              setSelectedMatchId(match._id);
                              setShowDeleteModal(true);
                            }}
                            style={{
                              cursor: "pointer",
                              color: "red",
                              fontSize: "30px",
                            }}
                          />
                          <Link to={`/admin/matchs/edit/${match._id}`}>
                            <FaPenSquare
                              style={{
                                cursor: "pointer",
                                color: "blue",
                                fontSize: "30px",
                              }}
                            />
                          </Link>
                        </div>
                        <div className="user-info">
                          <div className="user-avatar">
                            <img
                              src={match.utilisateur.photo}
                              alt="User Avatar"
                            />
                          </div>
                          <div className="user-name">
                            {match.utilisateur.nom}
                          </div>
                        </div>
                      </div>

                      {/* Section des icônes d'action */}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {/* Affichage conditionnel du modal de confirmation de suppression */}
      {showDeleteModal && (
        <div className="modal">
          <p>Voulez-vous vraiment supprimer ce match ?</p>
          {/* Bouton pour confirmer la suppression */}
          <button
            onClick={() => {
              handleDeleteMatch(selectedMatchId);
            }}
            className="yes_btn"
          >
            Oui
          </button>
          {/* Bouton pour annuler la suppression */}
          <button onClick={() => setShowDeleteModal(false)} className="no_btn">
            Non
          </button>
        </div>
      )}

      {/* Affichage conditionnel du message de suppression */}
      {deleteMessage && <div className="delete-message">{deleteMessage}</div>}
    </div>
  );
}
