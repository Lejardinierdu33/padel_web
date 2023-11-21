const Contact = require('../models/contact.model');

module.exports.sendContactForm = async (req, res) => {
  try {
    const { firstName, lastName, email, reason } = req.body;

    // Créez une nouvelle instance du modèle Contact
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      reason,
    });

    // Sauvegardez la nouvelle instance dans la base de données
    await newContact.save();

    // Envoyez une réponse indiquant que l'e-mail a été enregistré
    res.json({ message: 'E-mail enregistré avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'e-mail:', error);
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'e-mail.' });
  }
};

// Récupérer tous les mails
module.exports.getAllMails = async (req, res) => {
    try {
        // Récupérer tous les mails depuis la base de données
        const mails = await Contact.find();
        res.json(mails);
      } catch (error) {
        console.error('Erreur lors de la récupération des mails:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des mails.' });
      }
    };
  
  // Supprimer un mail par son ID
  module.exports.deleteMails = async (req, res) => {
    try {
      const contactId = req.params.id;
      await Contact.findByIdAndDelete(contactId);
      res.json({ message: 'E-mail supprimé avec succès.' });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'e-mail:', error);
      res.status(500).json({ error: 'Erreur lors de la suppression de l\'e-mail.' });
    }
  };
