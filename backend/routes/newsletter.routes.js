// Importation du module express
const express = require('express');
// Importation du contrôleur de la newsletter
const { postNewsletter, getAllNewsletter, deleteNewsletter, sendGroupEmail } = require('../controllers/newsletter.controller');

// Création d'un routeur express
const router = express.Router();

// Définition de la route pour s'abonner à la newsletter
router.post('/', postNewsletter);
router.get('/', getAllNewsletter); // Nouvelle route pour récupérer tous les e-mails
router.delete('/:id', deleteNewsletter); // Nouvelle route pour supprimer un e-mail
router.post('/sendGroupEmail', sendGroupEmail); // Nouvelle route pour l'envoi d'e-mails groupés



// Exportation du routeur
module.exports = router;
