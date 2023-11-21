const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Import des modèles Utilisateur et ClubDePadel
const Utilisateur = require("./user.model");
const ClubDePadel = require("./terrains.model");

// Définition du schéma pour le modèle de match de padel
const matchSchema = new Schema({
  utilisateur: {
    nom: String,
    photo: String,
    id: {
      type: Schema.Types.ObjectId,
      ref: "Utilisateur", // Référence au modèle Utilisateur
    },
    email: String,
    telephone: String,
  },
  date: {
    type: Date,
  },
  heure: {
    type: String,
  },
  personnesManquantes: {
    type: Number,
  },
  prixSession: {
    type: Number,
  },
  niveauMatch: {
    type: Number,
    min: 1,
    max: 10,
  },
  secteurLieu: {
    type: String,
    enum: ["Sud", "Nord", "Est", "Ouest"], // Le secteur de lieu doit être l'un des quatre enumérés
  },
  clubPadel: {
    type: String, // Utilisez le nom du club au lieu de l'ID
  },
  terrain: {
    type: String,
  },
});

// Création du modèle MatchPadel avec le schéma défini
const MatchPadel = mongoose.model("MatchPadel", matchSchema);

// Export du modèle MatchPadel pour être utilisé dans d'autres fichiers
module.exports = MatchPadel;
