const express = require('express');
// Importe le module express pour créer une application web

const cors = require('cors');
// Importe le module cors pour gérer les requêtes cross-origin

const bodyparser = require('body-parser');
// Importe le module body-parser pour parser les données des requêtes

const usersRouter = require('./routes/userRoutes');
const addressRouter = require('./routes/addressRoute');
const cartRouter = require('./routes/cartRoutes');
const commandRouter = require('./routes/commandRoutes');
const photoRouter = require('./routes/photoRoutes');
// Importe les routeurs pour les routes liées aux utilisateurs, adresses, paniers, commandes et photos

const app = express();
// Crée une instance de l'application Express

app.use(cors());
// Utilise le middleware cors pour autoriser les requêtes cross-origin

app.use(express.json());
// Utilise le middleware intégré à Express pour parser les données JSON des requêtes

app.use(bodyparser.json());
// Utilise le middleware body-parser pour parser les données JSON des requêtes

app.use('/api/users', usersRouter);
app.use('/api/address', addressRouter);
app.use('/api/cart', cartRouter);
app.use('/api/command', commandRouter);
app.use('/api/photo', photoRouter);
// Définit les routes pour les utilisateurs, adresses, paniers, commandes et photos

const PORT = process.env.PORT || 5000;
// Définit le port d'écoute de l'application (utilise la variable d'environnement PORT ou 5000 par défaut)

app.listen(PORT, () => {
    console.log(`Server is running on port localhost:${PORT}`);
});
// Démarre le serveur et écoute sur le port défini, affiche un message dans la console