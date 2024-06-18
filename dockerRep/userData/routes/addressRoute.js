const express = require('express');
const router = express.Router();
const db = require('../dbConnexion');

// Route pour créer une nouvelle adresse
router.post('/', (req, res) => {
    const { userId, City, Country, streetName, streetNumber, phoneNumber } = req.body;
    const query = 'INSERT INTO address (userId, City, Country, streetName, streetNumber, phoneNumber) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [userId, City, Country, streetName, streetNumber, phoneNumber], (err, results) => {
        if (err) {
            console.error('Error inserting address:', err);
            res.status(500).send('Error inserting address');
            return;
        }
        res.status(201).json({ addId: results.insertId, userId, City, Country, streetName, streetNumber, phoneNumber });
    });
});

// Route pour récupérer toutes les adresses
router.get('/', (req, res) => {
    const query = 'SELECT * FROM address';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching address:', err);
            res.status(500).send('Error fetching address');
            return;
        }
        res.json(results);
    });
});

// Route pour récupérer une adresse spécifique
router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    const query = 'SELECT * FROM address WHERE userId = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching address:', err);
            res.status(500).send('Error fetching address');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Address not found');
            return;
        }
        res.json(results[0]);
    });
});

// Route pour mettre à jour une adresse
router.put('/:userId', (req, res) => {
    const { userId } = req.params;
    const { City, Country, streetName, streetNumber, phoneNumber } = req.body;
    const query = 'UPDATE address SET City = ?, Country = ?, streetName = ?, streetNumber = ?, phoneNumber = ? WHERE userId = ?';
    db.query(query, [City, Country, streetName, streetNumber, phoneNumber, userId], (err, results) => {
        if (err) {
            console.error('Error updating address:', err);
            res.status(500).send('Error updating address');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Address not found');
            return;
        }
        res.json({ userId, City, Country, streetName, streetNumber, phoneNumber });
    });
});

// Route pour supprimer une adresse
router.delete('/:userId', (req, res) => {
    const { userId } = req.params;
    const query = 'DELETE FROM address WHERE userId = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error deleting address:', err);
            res.status(500).send('Error deleting address');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Address not found');
            return;
        }
        res.status(204).send();
    });
});

module.exports = router;