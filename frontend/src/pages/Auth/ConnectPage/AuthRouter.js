// Importation de React et des composants nécessaires depuis react-router-dom
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ConnectionPage from './ConnectionPage';  // Importation du composant ConnectionPage
import Error from '../../../_utils/Error/Error';  // Importation du composant Error pour les erreurs de routage

// Définition du composant AuthRouter
function AuthRouter() {
  // Configuration des routes pour l'authentification
  return (
    <Routes>
      {/* Route par défaut (index) qui affiche le composant ConnectionPage */}
      <Route index element={<ConnectionPage />} />
      
      {/* Route pour l'URL '/login' qui affiche également le composant ConnectionPage */}
      <Route path='login' element={<ConnectionPage />} />
      
      {/* Route pour toutes les autres URL qui affiche le composant Error pour gérer les erreurs de routage */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

// Exportation du composant AuthRouter
export default AuthRouter;
