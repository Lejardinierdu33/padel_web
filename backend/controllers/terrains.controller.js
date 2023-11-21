const TerrainModel = require("../models/terrains.model");

// Methode GET pour récupérer la liste de tous les terrains
module.exports.getTerrains = async (req, res) => {
  try {
    const terrains = await TerrainModel.find();
    res.status(200).json(terrains);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Methode POST pour créer un nouveau terrain
module.exports.createTerrain = async (req, res) => {
  if (req.body.nomClub) {
    res.status(400).json({ message: "Club déjà existant" });
  }
    const terrain = await TerrainModel.create({
      secteurLieu: req.body.secteurLieu,
      clubPadel: req.body.clubPadel,
      nomClub: req.body.nomClub,
      mailClub: req.body.mailClub,
      telClub: req.body.telClub,
      adresseClub: req.body.adresseClub,
      terrains: req.body.terrains,
    });
    res.status(200).json(terrain);
};

// Methode PUT pour mettre à jour un terrain par son ID
module.exports.updateTerrain = async (req, res) => {
  try {
    const terrainId = req.params.id;
    const updatedTerrain = await TerrainModel.findByIdAndUpdate(terrainId, req.body, { new: true });
    if (!updatedTerrain) {
      return res.status(404).json({ message: "Terrain non trouvé" });
    }
    res.status(200).json(updatedTerrain);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Methode DELETE pour supprimer un terrain par son ID
module.exports.deleteTerrain = async (req, res) => {
  try {
    const terrainId = req.params.id;
    const deletedTerrain = await TerrainModel.findByIdAndDelete(terrainId);
    if (!deletedTerrain) {
      return res.status(404).json({ message: "Terrain non trouvé" });
    }
    res.status(200).json({ message: "Terrain supprimé avec succès" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Fonction pour obtenir un utilisateur par son ID
module.exports.getTerrainById = async (req, res) => {
  const terrainId = req.params.id;

  try {
    // Recherchez l'utilisateur par son ID dans la base de données
    const terrain = await TerrainModel.findById(terrainId);

    if (!terrain) {
      return res.status(404).json({ message: "Terrain non trouvé" });
    }

    // Renvoyez les données de l'utilisateur en tant que réponse
    res.status(200).json(terrain);
  } catch (error) {
    // Gérez les erreurs, par exemple, en renvoyant un code d'erreur 500 en cas d'erreur interne du serveur
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération du terrain" });
  }
};
