// Importation des modules nécessaires depuis React et d'autres bibliothèques
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaPenSquare, FaUserPlus } from "react-icons/fa";
import "./AUser.css";  // Importation des styles spécifiques au composant
import { accountService } from "../../../_services/account.service";  // Importation du service d'administration des comptes

// Définition du composant fonctionnel AUser
export default function AUser() {
  // Déclaration des états nécessaires avec la fonction useState de React
  const [users, setUsers] = useState([]);  // Liste des utilisateurs
  const [deleteMessage, setDeleteMessage] = useState("");  // Message de confirmation de suppression
  const [showDeleteModal, setShowDeleteModal] = useState(false);  // Contrôle de l'affichage du modal de suppression
  const [selectedUserId, setSelectedUserId] = useState(null);  // ID de l'utilisateur sélectionné pour la suppression
  const [searchTerm, setSearchTerm] = useState("");  // Terme de recherche pour filtrer les utilisateurs
  const [filteredUsers, setFilteredUsers] = useState([]);  // Liste des utilisateurs filtrés en fonction de la recherche

  // Utilisation de useEffect pour effectuer une action au montage du composant
  useEffect(() => {
    // Fonction asynchrone pour récupérer les utilisateurs depuis le service d'administration des comptes
    const fetchUsers = async () => {
      try {
        const response = await accountService.getUsers();  // Appel à la fonction getUsers du service
        setUsers(response.data);  // Mise à jour de la liste des utilisateurs avec les données obtenues
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs:",
          error
        );
      }
    };

    fetchUsers();  // Appel de la fonction fetchUsers au montage du composant
  }, []);  // Le tableau vide indique que cette action n'a lieu qu'une seule fois au montage du composant

  // Fonction pour gérer la recherche d'utilisateurs
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);  // Mise à jour du terme de recherche
    // Filtrage des utilisateurs en fonction du terme de recherche
    const filteredUsers = users.filter((user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUsers);  // Mise à jour de la liste des utilisateurs filtrés
  };

  // Fonction pour afficher tous les utilisateurs
  const handleShowAllUsers = () => {
    setFilteredUsers(users);  // Affichage de tous les utilisateurs
    setSearchTerm("");  // Réinitialisation du terme de recherche
  };

  // Fonction pour gérer la suppression d'un utilisateur
  const handleDeleteUser = async (userId) => {
    try {
      // Effectuer une requête DELETE à l'API pour supprimer l'utilisateur par son ID
      await accountService.deleteUsers(userId);
      // Mettre à jour l'état des utilisateurs après la suppression
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
      setDeleteMessage("Utilisateur supprimé avec succès.");
      setShowDeleteModal(false);
      setTimeout(() => {
        setDeleteMessage("");
      }, 3000);  // Supprimer le message après 3 secondes
      console.log(`Utilisateur avec l'ID ${userId} supprimé.`);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      setDeleteMessage("Erreur lors de la suppression de l'utilisateur.");
      setShowDeleteModal(false);
      setTimeout(() => {
        setDeleteMessage("");
      }, 3000);  // Supprimer le message après 3 secondes en cas d'erreur
    }
  };

  // Rendu du composant avec du JSX
  return (
    <div className="section_user_index">
      <div className="A_User">
        {/* Section de la barre de recherche */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher par email..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button onClick={() => handleShowAllUsers()}>
            Voir tous les utilisateurs
          </button>
        </div>
        {/* Section principale des utilisateurs */}
        <div className="A_User_Section">
          {/* Bouton d'ajout d'utilisateur */}
          <Link to="/admin/users/add" className="add_btn_user">
            <FaUserPlus style={{ color: "#f7941d", fontSize: "50px" }} aria-label="add_user"/>
          </Link>
          {/* Message de suppression et modal de confirmation */}
          {deleteMessage && (
            <div className="delete-message">{deleteMessage}</div>
          )}
          {showDeleteModal && (
            <div className="modal">
              <p>Voulez-vous vraiment supprimer cet utilisateur ?</p>
              {/* Bouton pour confirmer la suppression */}
              <button
                onClick={() => {
                  handleDeleteUser(selectedUserId);
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
          {/* Section des cartes d'utilisateurs */}
          <div className="Card_user_admin">
            {filteredUsers.map((user) => (
              <div key={user._id} className="user-card">
                <img
                  src={user.photo}
                  alt={`${user.nom} ${user.prenom} avatar`}
                />
                <h2>
                  {user.nom} {user.prenom}
                </h2>
                <p>{user.email}</p>
                {/* Icônes pour la suppression et la modification de l'utilisateur */}
                <div className="icon_user_btn">
                  {/* Icône de suppression */}
                  <FaTrash
                    onClick={() => {
                      setSelectedUserId(user._id);
                      setShowDeleteModal(true);
                    }}
                    style={{
                      cursor: "pointer",
                      color: "red",
                      fontSize: "30px",
                    }}
                  />
                  {/* Icône de modification avec un lien vers la page d'édition */}
                  <Link to={`/admin/users/edit/${user._id}`}>
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
    
  );
}
