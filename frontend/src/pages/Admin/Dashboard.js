// Importation des modules nécessaires depuis React et d'autres dépendances
import React, { useState, useEffect } from "react";
import { FaUser, FaMapMarkedAlt, FaFlag, FaMailBulk, FaNewspaper} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Admin.css";
import { accountService } from "../../_services/account.service";

// Définition du composant Dashboard
export default function Dashboard() {
  // États pour stocker les données des utilisateurs, terrains et matchs
  const [userData, setUserData] = useState([]);
  const [terrainData, setTerrainData] = useState([]);
  const [matchData, setMatchData] = useState([]);
  const [mailData, setMailData] = useState([]);
  const [newsletterData, setNewsletterData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  // Utilisation de useEffect pour effectuer des requêtes à votre backend et récupérer les données au montage du composant
  useEffect(() => {
    // Fonction asynchrone pour récupérer les données des utilisateurs depuis le backend
    const fetchUserData = async () => {
      const response = await accountService.getUsers();
      setUserData(response.data);
    };

    // Fonction asynchrone pour récupérer les données des terrains depuis le backend
    const fetchTerrainData = async () => {
      const response = await accountService.getTerrains();
      setTerrainData(response.data);
    };

    // Fonction asynchrone pour récupérer les données des matchs depuis le backend
    const fetchMatchData = async () => {
      const response = await accountService.getMatchs();
      setMatchData(response.data);
    };

    const fetchMailData = async () => {
      const response = await accountService.getAllMails();
      setMailData(response.data);
    };

    const fetchNewsletterData = async () => {
      const response = await accountService.getAllNewsletter();
      setNewsletterData(response.data);
    };

    // Appel des fonctions de récupération des données
    fetchUserData();
    fetchTerrainData();
    fetchMatchData();
    fetchMailData();
    fetchNewsletterData();
  }, []);
  // Vérification si l'utilisateur a le rôle d'administrateur
  if (!user || user.role !== 'admin') {
    // Redirection de l'utilisateur vers une page non autorisée ou autre gestion en cas d'accès non autorisé
    return <div className="acces_bloque">Accès non autorisé</div>;
  }

  // Rendu du composant avec des liens vers les sections d'administration et affichage des statistiques
  return (
    <div className="section_dashboard_admin">
      <div className="Dashboard_Admin">
        {/* Lien vers la section des utilisateurs */}
        <Link to="/admin/users/index" className="dashboard-item-link">
          <div className="dashboard-item">
            <FaUser style={{ color: "yellow", fontSize: "50px" }} />
            <p>{userData.length}</p>
            <p>Utilisateurs</p>
          </div>
        </Link>

        {/* Lien vers la section des terrains */}
        <Link to="/admin/terrains/index" className="dashboard-item-link">
          <div className="dashboard-item">
            <FaMapMarkedAlt style={{ color: "blue", fontSize: "50px" }} />
            <p>{terrainData.length}</p>
            <p>Terrains</p>
          </div>
        </Link>

        {/* Lien vers la section des matchs */}
        <Link to="/admin/matchs/index" className="dashboard-item-link">
          <div className="dashboard-item">
            <FaFlag style={{ color: "red", fontSize: "50px" }} />
            <p>{matchData.length}</p>
            <p>Matchs</p>
          </div>
        </Link>

        {/* Lien vers la section des mails */}
        <Link to="/admin/contact/index" className="dashboard-item-link">
          <div className="dashboard-item">
            <FaMailBulk style={{ color: "green", fontSize: "50px" }} />
            <p>{mailData.length}</p>
            <p>Mails</p>
          </div>
        </Link>

         {/* Lien vers la section des newsletter */}
         <Link to="/admin/newsletter/index" className="dashboard-item-link">
          <div className="dashboard-item">
            <FaNewspaper style={{ color: "black", fontSize: "50px" }} />
            <p>{newsletterData.length}</p>
            <p>Newsletter</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
