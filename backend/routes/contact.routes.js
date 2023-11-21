const express = require('express');
const router = express.Router();
const {sendContactForm, getAllMails, deleteMails} = require('../controllers/contact.controller');

// Route pour envoyer le formulaire de contact
router.post('/', sendContactForm);
// Récupérer tous les mails
router.get('/', getAllMails);

// Supprimer un mail par son ID
router.delete('/:id', deleteMails);


module.exports = router;
