import React from 'react'
import NavBarCo from '../../components/Private/NavBarre/NavBarCo'
import { Outlet } from 'react-router-dom'
import FooterCo from '../../components/Private/Footer/FooterCo'
import MentionsBar from '../../components/Public/MentionsBar/MentionsBar'

export default function UserLayout() {
  return (
    // Mise en page générale pour les pages de l'utilisateur
    <div className='User_Layout'>
      
      {/* Barre de navigation spécifique pour les utilisateurs connectés */}
      <NavBarCo />

      {/* Outlet pour le rendu des composants enfants définis par les routes imbriquées */}
      <Outlet />

      {/* Pied de page spécifique pour les utilisateurs connectés */}
      <FooterCo />

      {/* Barre de mentions légales présente sur toutes les pages */}
      <MentionsBar />
      
    </div>
  )
}
