const express = require('express');
const router = express.Router();
const db = require('../dbConnexion');

// Route pour créer une nouvelle commande
router.post('/', (req, res) => {
    const { userId, productId, deliveryDate, countOfProdInCom } = req.body;
    const query = 'INSERT INTO command (userId, productId, deliveryDate, countOfProdInCom) VALUES (?, ?, ?, ?)';
    db.query(query, [userId, productId, deliveryDate, countOfProdInCom], (err, results) => {
        if (err) {
            console.error('Error inserting command:', err);
            res.status(500).send('Error inserting command');
            return;
        }
        res.status(201).json({ commandId: results.insertId, userId, productId, deliveryDate, countOfProdInCom });
    });
});

// Route pour récupérer toutes les commandes
router.get('/', (req, res) => {
    const query = 'SELECT * FROM command';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching commands:', err);
            res.status(500).send('Error fetching commands');
            return;
        }
        res.json(results);
    });
});
// Route pour récupérer toutes les commandes d'un utilisateur
router.get('/:userid', (req, res) => {
    const {userId}=req.params;
    const query = 'SELECT * FROM command Where userId=?';
    db.query(query,[userId], (err, results) => {
        if (err) {
            console.error('Error fetching commands:', err);
            res.status(500).send('Error fetching commands');
            return;
        }
        res.json(results);
    });
});
// Route pour récupérer toutes les commandes
router.get('/', (req, res) => {
    const query = 'SELECT * FROM command';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching commands:', err);
            res.status(500).send('Error fetching commands');
            return;
        }
        res.json(results);
    });
});

// Route pour récupérer une commande spécifique
router.get('/:commandId', (req, res) => {
    const { commandId } = req.params;
    const query = 'SELECT * FROM command WHERE commandId = ?';
    db.query(query, [commandId], (err, results) => {
        if (err) {
            console.error('Error fetching command:', err);
            res.status(500).send('Error fetching command');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Command not found');
            return;
        }
        res.json(results[0]);
    });
});

// Route pour mettre à jour une commande
router.put('/:commandId', (req, res) => {
    const { commandId } = req.params;
    const { userId, productId, deliveryDate, countOfProdInCom } = req.body;
    const query = 'UPDATE command SET userId = ?, productId = ?, deliveryDate = ?, countOfProdInCom = ? WHERE commandId = ?';
    db.query(query, [userId, productId, deliveryDate, countOfProdInCom, commandId], (err, results) => {
        if (err) {
            console.error('Error updating command:', err);
            res.status(500).send('Error updating command');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Command not found');
            return;
        }
        res.json({ commandId, userId, productId, deliveryDate, countOfProdInCom });
    });
});

// Route pour supprimer une commande
router.delete('/:commandId', (req, res) => {
    const { commandId } = req.params;
    const query = 'DELETE FROM command WHERE commandId = ?';
    db.query(query, [commandId], (err, results) => {
        if (err) {
            console.error('Error deleting command:', err);
            res.status(500).send('Error deleting command');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Command not found');
            return;
        }
        res.status(204).send();
    });
});

module.exports = router;