const express = require('express');
const router = express.Router();
const db = require('../dbConnexion');

// Route pour ajouter une nouvelle photo
router.post('/', (req, res) => {
    const { userId, photoUrl } = req.body;
    const query = 'INSERT INTO photo (userId, photoUrl) VALUES (?, ?)';
    db.query(query, [userId, photoUrl], (err, results) => {
        if (err) {
            console.error('Error adding photo:', err);
            res.status(500).send('Error adding photo');
            return;
        }
        res.status(201).json({ photoId: results.insertId, userId, photoUrl });
    });
});

// Route pour récupérer toutes les photos d'un utilisateur
router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    const query = 'SELECT * FROM photo WHERE userId = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching photos:', err);
            res.status(500).send('Error fetching photos');
            return;
        }
        res.json(results);
    });
});

// Route pour récupérer une photo spécifique
router.get('/:photoId', (req, res) => {
    const { photoId } = req.params;
    const query = 'SELECT * FROM photo WHERE photoId = ?';
    db.query(query, [photoId], (err, results) => {
        if (err) {
            console.error('Error fetching photo:', err);
            res.status(500).send('Error fetching photo');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Photo not found');
            return;
        }
        res.json(results[0]);
    });
});

// Route pour mettre à jour une photo
router.put('/:userId', (req, res) => {
    const { userId } = req.params;
    const { photoUrl } = req.body;
    const query = 'UPDATE photo SET photoUrl = ? WHERE userId = ?';
    db.query(query, [photoUrl ,userId], (err, results) => {
        if (err) {
            console.error('Error updating photo:', err);
            res.status(500).send('Error updating photo');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Photo not found');
            return;
        }
        res.json({ userId, photoUrl });
    });
});

// Route pour supprimer une photo
router.delete('/:userId', (req, res) => {
    const { userId } = req.params;
    const query = 'DELETE FROM photo WHERE userId = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error deleting photo:', err);
            res.status(500).send('Error deleting photo');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Photo not found');
            return;
        }
        res.status(204).send();
    });
});

module.exports = router;