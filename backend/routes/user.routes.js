const express = require("express");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  authenticateUser,
  getUserById,
  logout,
  updatePassword,
  get,
} = require("../controllers/user.controller");

const router = express.Router();

// router.get("/get", get);

// Les routes existantes
router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// Nouvelle route pour l'authentification
router.post("/login", authenticateUser);

router.post("/logout", logout);

// Nouvelle route pour la mise à jour du mot de passe
router.put("/:id/update-password", updatePassword);

// Récupérer un utilisateur avec son id
router.get("/:id", getUserById);

module.exports = router;
