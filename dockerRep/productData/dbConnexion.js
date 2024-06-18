
const mysql = require('mysql2');



function handleDisconnect() {
    const connection = mysql.createConnection({
        host: 'productdata-db', // Remplacez par l'adresse de votre serveur MySQL
        user: 'root',      // Remplacez par votre nom d'utilisateur MySQL
        password: 'rootpassword', // Remplacez par votre mot de passe MySQL
        database: 'productdb' // Remplacez par le nom de votre base de données
    });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      setTimeout(handleDisconnect, 2000); // Attendre 2 secondes avant de réessayer
    } else {
      console.log('Connected to the database as id ' + connection.threadId);
    }
  });

  connection.on('error', (err) => {
    console.error('Database error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect(); // Reconnecter automatiquement en cas de perte de connexion
    } else {
      throw err; // Autres erreurs, lever une exception
    }
  });
module.exports = connection;
}

handleDisconnect();

