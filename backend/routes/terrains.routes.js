const express = require("express");
const { getTerrains, createTerrain, updateTerrain, deleteTerrain, getTerrainById } = require("../controllers/terrains.controller");
const router = express.Router();

// Routes pour les terrains de padel
router.get("/", getTerrains); // Récupérer la liste de tous les terrains
router.post("/", createTerrain); // Créer un nouveau terrain
router.put("/:id", updateTerrain); // Mettre à jour un terrain par son ID
router.delete("/:id", deleteTerrain); // Supprimer un terrain par son ID

// Récupérer un terrain avec son id
router.get("/:id", getTerrainById);


module.exports = router;
