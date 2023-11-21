import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { accountService } from "../../../_services/account.service";
import "./HomeCo.css";
import PopupResa from "../../../components/Private/PopupResa/PopupResa";

function HomeCo() {
  // États pour gérer les données de la page
  const [matchs, setMatchs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState("");
  const [selectedLevels, setSelectedLevels] = useState("");
  const [selectedSectors, setSelectedSectors] = useState("");
  const [selectedMatches, setSelectedMatches] = useState([]);

  // Récupération des informations utilisateur depuis le stockage local
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.userId; // Extraction de l'identifiant de l'utilisateur

  // Effet pour charger les matchs au chargement de la page
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await accountService.getMatchs();
        setMatchs(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des matchs:", error);
      }
    };

    fetchMatches();
  }, []);

  // Fonction pour gérer la suppression d'un match
  const handleDeleteMatch = (matchId) => {
    try {
      console.log(matchId);
      // Récupérer le match associé à l'ID
      const matchToDelete = matchs.find(
        (match) => match.utilisateur.id === userId
      );

      // Vérifier si l'utilisateur connecté est le créateur du match
      console.log("userId:", userId);
      console.log("match.utilisateur._id:", matchToDelete.utilisateur.id);

      if (String(userId) === String(matchToDelete.utilisateur.id)) {
        // Afficher la modal de confirmation
        setShowDeleteModal(true);
        setSelectedMatchId(matchId);
      } else {
        // L'utilisateur connecté n'est pas le créateur du match, afficher un message ou prendre d'autres mesures
        console.log("Vous n'êtes pas autorisé à supprimer ce match.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du match:", error);
      setDeleteMessage("Erreur lors de la suppression du match.");
      setShowDeleteModal(false);

      setTimeout(() => {
        setDeleteMessage("");
      }, 3000);
    }
  };

  // Fonction pour gérer la confirmation de suppression d'un match
  const handleDeleteMatchConfirmation = async () => {
    try {
      // Supprimer le match
      await accountService.deleteMatchs(selectedMatchId);

      // Mettre à jour la liste des matchs côté client
      const updatedMatchs = matchs.filter(
        (match) => match._id !== selectedMatchId
      );
      setMatchs(updatedMatchs);

      setDeleteMessage("Match supprimé avec succès.");
      setShowDeleteModal(false);

      setTimeout(() => {
        setDeleteMessage("");
      }, 3000);

      console.log(`Match avec l'ID ${selectedMatchId} supprimé.`);
    } catch (error) {
      console.error("Erreur lors de la suppression du match:", error);
      setDeleteMessage("Erreur lors de la suppression du match.");
      setShowDeleteModal(false);

      setTimeout(() => {
        setDeleteMessage("");
      }, 3000);
    }
  };

  // Fonctions pour gérer les changements de filtres
  const handleTimeSlotChange = (value) => {
    if (selectedTimeSlots.includes(value)) {
      setSelectedTimeSlots(selectedTimeSlots.filter((slot) => slot !== value));
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, value]);
    }
  };

  const handleLevelChange = (value) => {
    if (selectedLevels.includes(value)) {
      setSelectedLevels(selectedLevels.filter((level) => level !== value));
    } else {
      setSelectedLevels([...selectedLevels, value]);
    }
  };

  const handleSectorChange = (value) => {
    if (selectedSectors.includes(value)) {
      setSelectedSectors(selectedSectors.filter((sector) => sector !== value));
      console.log(value);
    } else {
      setSelectedSectors([...selectedSectors, value]);
    }
  };

  const handleReservationClick = (match) => {
    const newSelectedMatches = [...selectedMatches];
    newSelectedMatches[match._id] = true;
    setSelectedMatches(newSelectedMatches);
  };

  const handlePopupClose = (matchId) => {
    const newSelectedMatches = [...selectedMatches];
    newSelectedMatches[matchId] = false;
    setSelectedMatches(newSelectedMatches);
  };

  const getSectorColorClass = (sector) => {
    switch (sector) {
      case "Nord":
        return "sector-nord";
      case "Sud":
        return "sector-sud";
      case "Ouest":
        return "sector-ouest";
      case "Est":
        return "sector-est";
      default:
        return "";
    }
  };

  const handleMyMatchesClick = () => {
    if (selectedMatches.includes("mes-matchs")) {
      // La checkbox "Mes Matchs" est déjà cochée, réinitialiser la liste des matchs
      const fetchMatches = async () => {
        try {
          const response = await accountService.getMatchs();
          setMatchs(response.data);
        } catch (error) {
          console.error("Erreur lors de la récupération des matchs:", error);
        }
      };

      fetchMatches();
    } else {
      // La checkbox "Mes Matchs" est cochée, filtrer les matchs en fonction de l'utilisateur
      const myMatches = matchs.filter(
        (match) => match.utilisateur.id === userId
      );
      setMatchs(myMatches);
    }

    // Réinitialiser les autres filtres
    setSearchTerm("");
    setSelectedDate("");
    setSelectedPlayers("");
    setSelectedTimeSlots([]);
    setSelectedLevels([]);
    setSelectedSectors([]);
  };

  const handleResetMatches = async () => {
    try {
      // Fetch all matches and update the state
      const response = await accountService.getMatchs();
      setMatchs(response.data);
    } catch (error) {
      console.error("Error resetting matches:", error);
    }
  };

  return (
    // Conteneur principal de la page d'accueil de l'utilisateur connecté
    <div className="section_home_co">
      {/* Section d'en-tête de la page */}
      <div className="section_header_co">
        <div className="overlay_header_co"></div>
        {/* Section des filtres de recherche */}
        <div className="filter-section_co">
          <input
            aria-label="search_bar_co"
            id="search-co"
            className="filtre_search_co"
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            aria-label="selected-date"
            className="filtre_search_co"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <input
            aria-label="nbr-personne"
            className="filtre_search_co"
            type="number"
            placeholder="Nombre de personnes..."
            value={selectedPlayers}
            onChange={(e) => setSelectedPlayers(e.target.value)}
          />
        </div>
        {/* Affichage du message de suppression et du modal de confirmation */}
        {deleteMessage && <div className="delete-message">{deleteMessage}</div>}
        {/* Affichage de la modal de confirmation de suppression */}
        {showDeleteModal && (
          <div className="modal">
            <p>Voulez-vous vraiment supprimer ce match ?</p>
            {/* Bouton pour confirmer la suppression */}
            <button
              onClick={() => {
                handleDeleteMatchConfirmation(selectedMatchId);
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
        {/* Affichage conditionnel du message de suppression */}
        {deleteMessage && <div className="delete-message">{deleteMessage}</div>}
      </div>
      {/* Section principale d'affichage des matchs */}
      <div className="section_match_co">
        <div className="section_left_filtre">
          <p className="trier_par">Trier par :</p>
          <div className="section_mymatch_co">
            <button
              onClick={() => handleMyMatchesClick()}
              className="match-btn"
            >
              Mes Matchs
            </button>
            <button onClick={() => handleResetMatches()} className="reset-btn">
              Réinitialiser
            </button>
          </div>
          <div className="filter-section_co_left">
            <label htmlFor="hours">Horaire :</label>
            {/* Options de filtre pour les horaires */}
            <div className="checkbox-container">
              <input
                id="hours"
                className="checkbox-input"
                type="checkbox"
                value="morning"
                checked={selectedTimeSlots.includes("morning")}
                onChange={() => handleTimeSlotChange("morning")}
              />
              <span className="checkbox-label">8h - 12h</span>
            </div>
            <div className="checkbox-container">
              <input
                aria-label="afternoon"
                className="checkbox-input"
                type="checkbox"
                value="afternoon"
                checked={selectedTimeSlots.includes("afternoon")}
                onChange={() => handleTimeSlotChange("afternoon")}
              />
              <span className="checkbox-label">12h - 17h</span>
            </div>
            <div className="checkbox-container">
              <input
                aria-label="evening"
                className="checkbox-input"
                type="checkbox"
                value="evening"
                checked={selectedTimeSlots.includes("evening")}
                onChange={() => handleTimeSlotChange("evening")}
              />
              <span className="checkbox-label">17h - 22h</span>
            </div>
          </div>
          {/* Options de filtre pour le niveau du padel */}
          <div className="filter-section_co_left">
            <label htmlFor="lvlPadel">Niveau padel :</label>
            <div className="checkbox-container">
              <input
                id="lvlPadel"
                className="checkbox-input"
                type="checkbox"
                value="1-2"
                checked={selectedLevels.includes("1-2")}
                onChange={() => handleLevelChange("1-2")}
              />
              <span className="checkbox-label">1-2</span>
            </div>
            <div className="checkbox-container">
              <input
                aria-label="3-5"
                className="checkbox-input"
                type="checkbox"
                value="3-5"
                checked={selectedLevels.includes("3-5")}
                onChange={() => handleLevelChange("3-5")}
              />
              <span className="checkbox-label">3-5</span>
            </div>
            <div className="checkbox-container">
              <input
                aria-label="6-8"
                className="checkbox-input"
                type="checkbox"
                value="6-8"
                checked={selectedLevels.includes("6-8")}
                onChange={() => handleLevelChange("6-8")}
              />
              <span className="checkbox-label">6-8</span>
            </div>
            <div className="checkbox-container">
              <input
                aria-label="9-10"
                className="checkbox-input"
                type="checkbox"
                value="9-10"
                checked={selectedLevels.includes("9-10")}
                onChange={() => handleLevelChange("9-10")}
              />
              <span className="checkbox-label">9-10</span>
            </div>
          </div>
          {/* Options de filtre pour le secteur */}
          <div className="filter-section_co_left">
            <label htmlFor="secteurLieu">Secteur :</label>
            <div className="checkbox-container">
              <input
                id="secteurLieu"
                className="checkbox-input"
                type="checkbox"
                value="Nord"
                checked={selectedSectors.includes("Nord")}
                onChange={() => handleSectorChange("Nord")}
              />
              <span className="checkbox-label">Nord</span>
            </div>
            <div className="checkbox-container">
              <input
                aria-label="Sud"
                className="checkbox-input"
                type="checkbox"
                value="Sud"
                checked={selectedSectors.includes("Sud")}
                onChange={() => handleSectorChange("Sud")}
              />
              <span className="checkbox-label">Sud</span>
            </div>
            <div className="checkbox-container">
              <input
                aria-label="Est"
                className="checkbox-input"
                type="checkbox"
                value="Est"
                checked={selectedSectors.includes("Est")}
                onChange={() => handleSectorChange("Est")}
              />
              <span className="checkbox-label">Est</span>
            </div>
            <div className="checkbox-container">
              <input
                aria-label="Ouest"
                className="checkbox-input"
                type="checkbox"
                value="Ouest"
                checked={selectedSectors.includes("Ouest")}
                onChange={() => handleSectorChange("Ouest")}
              />
              <span className="checkbox-label">Ouest</span>
            </div>
          </div>
        </div>
        {/* Section d'affichage des cartes de matchs */}
        <div className="section_right_card">
          <div className="Card_match_admin">
            {/* Filtrage et affichage des cartes de matchs */}
            {matchs
              .filter((match) =>
                match.date.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .filter((match) =>
                selectedDate ? match.date === selectedDate : true
              )
              .filter((match) =>
                selectedPlayers
                  ? match.personnesManquantes >= selectedPlayers
                  : true
              )
              .filter((match) =>
                selectedSectors.length > 0
                  ? selectedSectors.includes(match.secteurLieu)
                  : true
              )
              .filter((match) => {
                const matchTime = parseInt(match.heure.split(":")[0], 10);
                if (selectedTimeSlots.includes("morning"))
                  return matchTime >= 8 && matchTime <= 12;
                if (selectedTimeSlots.includes("afternoon"))
                  return matchTime > 12 && matchTime <= 17;
                if (selectedTimeSlots.includes("evening"))
                  return matchTime > 17 && matchTime <= 22;
                return true;
              })
              .filter((match) => {
                if (selectedLevels.length > 0) {
                  const [min, max] = selectedLevels[0].split("-").map(Number);
                  return match.niveauMatch >= min && match.niveauMatch <= max;
                }
                return true;
              })
              .map((match) => {
                const formattedDate = new Date(match.date).toLocaleDateString(
                  "fr-FR"
                );
                const sectorColorClass = getSectorColorClass(match.secteurLieu);

                return (
                  // Carte d'affichage d'un match
                  <div
                    key={match._id}
                    className={`match-card ${sectorColorClass}`}
                  >
                    {userId === match.utilisateur.id && (
                      <FaTrash
                        onClick={() => handleDeleteMatch(match._id)}
                        style={{
                          cursor: "pointer",
                          color: "red",
                          fontSize: "20px",
                          zIndex: "1",
                        }}
                      />
                    )}
                    {/* Section du haut */}
                    <div className="match-top-section">
                      <div className="secteurLieu_section">
                        {match.secteurLieu}
                      </div>
                      <div className="club-name">{match.clubPadel}</div>
                      <div className="match-level">
                        Niveau du match : {match.niveauMatch}
                      </div>
                    </div>

                    {/* Section du centre */}
                    <div className="match-center-section">
                      <div className="section_hd">
                        <div className="match-date">{formattedDate}</div>
                        <div className="match-hour">{match.heure}</div>
                      </div>
                      <div className="missing-players">
                        {match.personnesManquantes} places
                      </div>
                      <div className="price-per-person">
                        {match.prixSession} €/pers
                      </div>
                    </div>

                    {/* Section du bas */}
                    <div className="match-bottom-section">
                      {/* Informations sur l'utilisateur créateur du match */}
                      <div className="user-info">
                        <div className="user-avatar">
                          <img
                            src={match.utilisateur.photo}
                            alt="User Avatar"
                          />
                        </div>
                        <div className="user-name">{match.utilisateur.nom}</div>
                      </div>
                      <div className="pop_up_resa">
                        {selectedMatches[match._id] && (
                          <PopupResa
                            match={match}
                            onClose={() => handlePopupClose(match._id)}
                          />
                        )}
                      </div>
                      <button
                        onClick={() => handleReservationClick(match)}
                        className="login-button"
                      >
                        Réserver
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCo;
