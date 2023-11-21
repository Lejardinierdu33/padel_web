// Importation de React et des composants nécessaires depuis react-router-dom
import React from 'react';
import { Outlet } from 'react-router-dom';
import ANavBarre from '../../components/Admin/Navbarre/ANavBarre';  // Importation du composant ANavBarre
import AFooter from '../../components/Admin/Footer/AFooter';  // Importation du composant AFooter

// Définition du composant AdminLayout
export default function AdminLayout() {
  // Rendu du composant qui représente la mise en page de l'interface administrateur
  return (
    <div className='Admin_Layout'>
      {/* Affichage de la barre de navigation de l'interface administrateur */}
      <ANavBarre />
      
      {/* Outlet pour afficher le contenu spécifique à chaque route enfant */}
      <Outlet />

      {/* Affichage du pied de page de l'interface administrateur */}
      <AFooter />
    </div>
  );
}
