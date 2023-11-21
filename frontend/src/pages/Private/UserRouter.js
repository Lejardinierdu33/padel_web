import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./UserLayout";
import HomeCo from "./home/HomeCo";
import CreateMatch from "./CreateMatch/CreateMatch";
import PageModifDonne from "./DonneesPerso/PageModifDonne";
import ModifMp from "./DonneesPerso/ModifMp/ModifMp";
import ModifDonne from "./DonneesPerso/ModifDonne/ModifDonne";
import Error from "../../_utils/Error/Error";

export default function UserRouter() {
  return (
    // Configuration des routes pour l'espace utilisateur
    <Routes>
      {/* Utilisation du composant UserLayout comme mise en page principale pour les pages de l'utilisateur */}
      <Route element={<UserLayout />}>
        {/* Page d'accueil de l'utilisateur */}
        <Route index element={<HomeCo />} />
        <Route path="homeco" element={<HomeCo />} />

        {/* Page de création d'un nouveau match */}
        <Route path="ajout_match" element={<CreateMatch />} />

        {/* Pages de modification des données personnelles */}
        <Route path="modificationdonnees">
          {/* Page principale de modification des données */}
          <Route path="index" element={<PageModifDonne />} />

          {/* Page de modification des informations personnelles */}
          <Route path="edit" element={<ModifDonne />} />

          {/* Page de modification du mot de passe */}
          <Route path="editmp" element={<ModifMp />} />
        </Route>

        {/* Gestion des erreurs pour les routes non définies */}
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}
