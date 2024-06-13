const express = require('express');
// Importe le module express pour créer une application web

const cors = require('cors');
// Importe le module cors pour gérer les requêtes cross-origin

const bodyparser = require('body-parser');
// Importe le module body-parser pour parser les données des requêtes

const productRouter = require('./routes/produitsRoutes');
const categoryRouter = require('./routes/category');
const photoRouter = require('./routes/photoRoutes');
// Importe les routeurs pour les routes liées aux produits, catégories et photos

const app = express();
// Crée une instance de l'application Express

app.use(cors());
// Utilise le middleware cors pour autoriser les requêtes cross-origin

app.use(express.json());
// Utilise le middleware intégré à Express pour parser les données JSON des requêtes

app.use(bodyparser.json());
// Utilise le middleware body-parser pour parser les données JSON des requêtes

app.use('/api/products', productRouter);
app.use('/api/category', categoryRouter);
app.use('/api/photo', photoRouter);
// Définit les routes pour les produits, catégories et photos

const PORT = process.env.PORT || 5002;
// Définit le port d'écoute de l'application (utilise la variable d'environnement PORT ou 5002 par défaut)

app.listen(PORT, () => {
    console.log(`Server is running on port localhost:${PORT}`);
});
// Démarre le serveur et écoute sur le port défini, affiche un message dans la console