import React from "react";
import { Outlet } from "react-router-dom";
import MentionsBar from "../components/Public/MentionsBar/MentionsBar";

function Layout() {
  return (
    <div>
      {/* Outlet pour le rendu des composants enfants définis par les routes imbriquées */}
      <Outlet />
      {/* Barre de mentions légales présente sur toutes les pages */}
      <MentionsBar />
    </div>
  );
}

export default Layout;
