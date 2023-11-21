// Importation des modules nécessaires depuis React
import React, { createContext, useContext, useState } from 'react';

// Création du contexte utilisateur (UserContext)
const UserContext = createContext();

// Définition du composant UserProvider qui fournit le contexte utilisateur aux composants enfants
export const UserProvider = ({ children }) => {
  // État pour stocker les informations de l'utilisateur
  const [userCo, setUser] = useState({
    _id: null,
    nom: '',
    photo: '',
    email: '',
    telephone: '',
    // Ajoutez d'autres propriétés au besoin
  });

  // Fonction pour mettre à jour les informations de l'utilisateur
  const updateUser = (newUserData) => {
    // Mise à jour de l'état utilisateur en fusionnant les données actuelles avec les nouvelles données
    setUser((prevUser) => ({
      ...prevUser,
      ...newUserData,
    }));
  };

  // Fourniture du contexte utilisateur et de la fonction de mise à jour aux composants enfants
  return (
    <UserContext.Provider value={{ userCo, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Fonction utilitaire personnalisée useUser pour accéder au contexte utilisateur dans les composants enfants
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    // Si la fonction est utilisée en dehors d'un contexte UserProvider, une erreur est levée
    throw new Error('useUser doit être utilisé dans un UserProvider');
  }
  return context;
};
