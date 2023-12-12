// Importation du modèle Newsletter
const Newsletter = require('../models/newsletter.model');
const nodemailer = require('nodemailer');

// Contrôleur pour enregistrer une nouvelle adresse e-mail dans la newsletter
module.exports.postNewsletter = async (req, res) => {
  try {
    // Récupération de l'adresse e-mail depuis le corps de la requête
    const { email } = req.body;

    // Vérification si l'adresse e-mail existe déjà dans la base de données
    const existingSubscriber = await Newsletter.findOne({ email });

    if (existingSubscriber) {
      return res.status(400).json({ message: 'Adresse e-mail déjà enregistrée dans la newsletter.' });
    }

    // Création d'un nouvel enregistrement dans la collection Newsletter
    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    res.status(201).json({ message: 'Adresse e-mail enregistrée avec succès dans la newsletter.' });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement dans la newsletter:', error);
    res.status(500).json({ message: 'Erreur serveur lors de l\'enregistrement dans la newsletter.' });
  }
};

// Récupérer tous les e-mails de la newsletter
module.exports.getAllNewsletter = async (req, res) => {
  try {
    const emails = await Newsletter.find();
    res.status(200).json(emails);
  } catch (error) {
    console.error('Erreur lors de la récupération des e-mails de la newsletter:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des e-mails de la newsletter.' });
  }
};

// Supprimer un e-mail de la newsletter
module.exports.deleteNewsletter = async (req, res) => {
  try {
    const emailId = req.params.id;
    const deletedEmail = await Newsletter.findByIdAndDelete(emailId);
    res.status(200).json({ message: 'E-mail supprimé avec succès.', deletedEmail });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'e-mail de la newsletter:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de l\'e-mail de la newsletter.' });
  }
};

// Nouvelle fonction pour envoyer un e-mail groupé
module.exports.sendGroupEmail = async (req, res) => {
  try {
    // Récupérez tous les abonnés de la newsletter
    const subscribers = await Newsletter.find();

    // Récupérez le sujet et le corps du message depuis le corps de la requête
    const { subject, body } = req.body;

    // Configuration du transporteur nodemailer (utilisez votre propre configuration)
    const transporter = nodemailer.createTransport({
      service: 'outlook',
      auth: {
        user: 'leo.segalini@outlook.com', // Remplacez par votre adresse e-mail Outlook
        pass: 'LOLOLOLO.12121212', // Remplacez par votre mot de passe Outlook
      },
    });

    // Envoyer un e-mail à chaque abonné avec CCI
    for (const subscriber of subscribers) {
      await transporter.sendMail({
        from: 'leo.segalini@outlook.com',
        to: 'leo.segalini@outlook.com',
        subject: subject,
        text: body,
        bcc: subscriber.email, // Utilisez "bcc" pour la copie cachée
      });
    }

    res.status(200).json({ message: 'E-mails groupés envoyés avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi des e-mails groupés:', error);
    res.status(500).json({ message: 'Erreur serveur lors de l\'envoi des e-mails groupés.' });
  }
};