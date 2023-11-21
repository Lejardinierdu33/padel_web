require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cron = require('node-cron');
const moment = require('moment');
const Match = require('./models/post.model');
const path = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser'); // Ajout de body-parser

// Appel BDD
connectDB();

const app = express();

// Use Helmet!
app.use(helmet());

app.use(cors());
// Utilisation de body-parser pour traiter le corps des requêtes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware pour servir les images depuis les dossiers correspondants
app.use('/images/components', express.static(path.join(__dirname, '/frontend/src/components/img'), { maxAge: '7d' }));
app.use('/images/pages', express.static(path.join(__dirname, '/frontend/src/pages/img'), { maxAge: '7d' }));

cron.schedule('0 0 * * *', async () => {
  try {
    const currentDate = moment().toISOString();

    await Match.deleteMany({ date: { $lt: moment().startOf('day') } });

    console.log('Suppression des matchs passés terminée.');
  } catch (error) {
    console.error('Erreur lors de la suppression des matchs:', error);
  }
});

// Routes
app.use('/matchs', require('./routes/post.routes'));
app.use('/users', require('./routes/user.routes'));
app.use('/terrains', require('./routes/terrains.routes'));
app.use('/subscribe', require('./routes/newsletter.routes'));
app.use('/contact', require('./routes/contact.routes'));
app.use('/newsletter', require('./routes/newsletter.routes'));

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log('Le Serveur a démarré au port ' + port);
});


// Exportez votre application ET le serveur
module.exports = { app, server };
