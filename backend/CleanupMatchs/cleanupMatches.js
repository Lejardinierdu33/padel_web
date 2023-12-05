require('dotenv').config();

const mongoose = require('mongoose');
const moment = require('moment');
const cron = require('node-cron');
const Match = require('../models/post.model');

const url = "mongodb+srv://" + process.env.HOST + "/" + process.env.DB_NAME;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Exécutez le nettoyage tous les jours à minuit
cron.schedule('0 0 * * *', async () => {
    try {
      const currentDate = moment().toISOString();
  
      // Supprime les matchs dont la date est passée
      await Match.deleteMany({ date: { $lt: moment().startOf('day') } });
  
      console.log('Suppression des matchs passés terminée.');
    } catch (error) {
      console.error('Erreur lors de la suppression des matchs:', error);
    } finally {
      mongoose.disconnect();
    }
  });
