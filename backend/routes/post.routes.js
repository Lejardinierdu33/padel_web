const express = require("express");
const { getMatch, setMatch, editMatch, deleteMatch, getMatchById} = require("../controllers/post.controller");
const router = express.Router();

// les 4 principe de base pour une requete API

router.get("/", getMatch);
router.post("/", setMatch);
router.put("/:id", editMatch);
router.delete("/:id", deleteMatch);

// Récupérer un match avec son id
router.get("/:id", getMatchById);

module.exports = router;


