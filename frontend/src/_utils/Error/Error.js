import React from 'react';
import './Error.css';

// Composant fonctionnel Error
function Error() {
  return (
    <div className="error-container">
      {/* Contenu de l'erreur */}
      <div className="error-content">
        <h1>Erreur 404</h1>
        <p>Désolé, la page que vous recherchez est introuvable.</p>
      </div>
    </div>
  );
}

// Export du composant Error pour l'utiliser ailleurs
export default Error;
