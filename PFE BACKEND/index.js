const express = require("express");
const createError = require('http-errors');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const usersRouter = require('./routes/users'); 
const appRouter = require('./routes/app');

const app = express();
app.use(express.static('./public'));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connexion à la base de données
mongoose.connect('mongodb://0.0.0.0:27017/ma_base_de_donnees_pfe', {
}).then(() => {
  console.log('Connecté à la base de données');
}).catch((err) => {
  console.log("Erreurdeconnexion");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Définir les routes
app.use('/', appRouter);
app.use('/users', usersRouter);

// Gestion des erreurs 404
app.use((req, res, next) => {
  next(createError(404));
});

// Middleware pour gestion des erreurs
app.use((err, req, res, next) => {
  // Vérifie si l'erreur est une NotFoundError
  if (err.name === 'NotFoundError') {
    // Renvoie une réponse JSON avec un message approprié
    return res.status(404).json({ error: 'Ressource non trouvée' });
  }

  // Si ce n'est pas une NotFoundError, passe à l'erreur suivante
  next(err);
});

app.listen(5000, () => console.log("Serveur en écoute sur le port 5000"));