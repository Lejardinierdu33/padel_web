const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Définition du schéma pour le modèle de terrain de padel
const terrainSchema = new Schema({
  secteurLieu: {
    type: String, 
    enum: ["Sud", "Nord", "Est", "Ouest"], // Le secteur de lieu doit être l'un des quatre enumérés
  },
  clubPadel: {
    nomClub: {
      type: String, 
      required: true, // Le nom du club est obligatoire
    },
    mailClub: {
      type: String, 
      required: true, // L'adresse e-mail du club est obligatoire
    },
    telClub: {
      type: String, 
      required: true, // Le numéro de téléphone du club est obligatoire
    },
    adresseClub: {
      type: String, 
      required: true, // L'adresse du club est obligatoire
    },
    terrains: [
      { nom: { type: String } } // Liste des terrains du club, avec chaque terrain ayant un nom
    ]
  }
});

// Création du modèle TerrainPadel avec le schéma défini
const TerrainPadel = mongoose.model('TerrainPadel', terrainSchema);

// Export du modèle TerrainPadel pour être utilisé dans d'autres fichiers
module.exports = TerrainPadel;
