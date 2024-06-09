const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost', // Remplacez par l'adresse de votre serveur MySQL
    user: 'root',      // Remplacez par votre nom d'utilisateur MySQL
    password: '', // Remplacez par votre mot de passe MySQL
    database: 'userdb' // Remplacez par le nom de votre base de données
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as id ' + connection.threadId);
});

module.exports = connection;