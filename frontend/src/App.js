import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRouter from "./pages/Public/PublicRouter";
import AdminRouter from "./pages/Admin/AdminRouter";
import AuthRouter from "./pages/Auth/ConnectPage/AuthRouter";
import AuthGuard from "./helpers/AuthGuard";
import { UserProvider } from "./pages/Admin/UserContext";
import UserRouter from "./pages/Private/UserRouter";

function App() {
  return (
    // Conteneur principal de l'application
    <div className="App">
      
      {/* Fournisseur de contexte utilisateur pour les pages d'administration */}
      <UserProvider>
        
        {/* Utilisation du routeur BrowserRouter pour gérer les routes */}
        <BrowserRouter>
          
          {/* Configuration des différentes routes de l'application */}
          <Routes>
            
            {/* Route pour les pages publiques (non authentifiées) */}
            <Route path="/*" element={<PublicRouter />} />
            
            {/* Route pour les pages d'authentification */}
            <Route path="/auth/*" element={<AuthRouter />} />
            
            {/* Route pour les pages privées de l'utilisateur après connexion */}
            <Route path="/homeco/*" element={
              <AuthGuard>
                <UserRouter />
              </AuthGuard>
            } />
            
            {/* Route pour les pages d'administration nécessitant une authentification */}
            <Route
              path="/admin/*"
              element={
                <AuthGuard>
                  <AdminRouter />
                </AuthGuard>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
