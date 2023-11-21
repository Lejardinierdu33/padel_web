const mongoose = require("mongoose");

// Fonction asynchrone pour se connecter à la base de données MongoDB
const connectDB = async () => {
  // Construction de l'URL de la base de données en utilisant les variables d'environnement
  const url = "mongodb+srv://" + process.env.HOST + "/" + process.env.DB_NAME;

  try {
    // Tentative de connexion à la base de données MongoDB
    await mongoose.connect(url, {});

    // Affichage d'un message de réussite si la connexion est établie
    console.log('MongoDB connecté');
  } catch (err) {
    // Affichage de l'erreur en cas d'échec de la connexion
    console.log(err);
  }
};

// Export de la fonction connectDB pour être utilisée dans d'autres fichiers
module.exports = connectDB;
