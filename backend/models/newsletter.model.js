// Importation du module mongoose
const mongoose = require('mongoose');

// Définition du schéma pour les adresses e-mail de la newsletter
const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
});

// Création du modèle Newsletter basé sur le schéma
const Newsletter = mongoose.model('Newsletter', newsletterSchema);

// Exportation du modèle Newsletter
module.exports = Newsletter;
