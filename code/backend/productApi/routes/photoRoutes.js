const express = require('express');
const router = express.Router();
const db = require('../dbConnexion');

// Route pour ajouter une nouvelle photo
router.post('/', (req, res) => {
    const { productId, photoUrl } = req.body;
    const query = 'INSERT INTO photo (productId, photoUrl) VALUES (?, ?)';
    db.query(query, [productId, photoUrl], (err, result) => {
        if (err) {
            console.error('Error adding photo:', err);
            res.status(500).send('Error adding photo');
            return;
        }
        res.status(201).json({ photoId: result.insertId, productId, photoUrl });
    });
});

// Route pour récupérer toutes les photos d'un produit
router.get('/product/:productId', (req, res) => {
    const { productId } = req.params;
    const query = 'SELECT * FROM photo WHERE productId = ?';
    db.query(query, [productId], (err, results) => {
        if (err) {
            console.error('Error fetching photos:', err);
            res.status(500).send('Error fetching photos');
            return;
        }
        res.json(results);
    });
});

// Route pour récupérer une photo spécifique
router.get('/:productId', (req, res) => {
    const { productId } = req.params;
    const query = 'SELECT * FROM photo WHERE productId = ?';
    db.query(query, [productId], (err, results) => {
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
router.put('/:photoId', (req, res) => {
    const { photoId } = req.params;
    const { photoUrl } = req.body;
    const query = 'UPDATE photo SET photoUrl = ? WHERE photoId = ?';
    db.query(query, [photoUrl, photoId], (err, result) => {
        if (err) {
            console.error('Error updating photo:', err);
            res.status(500).send('Error updating photo');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Photo not found');
            return;
        }
        res.json({ photoId, photoUrl });
    });
});

// Route pour supprimer une photo
router.delete('/:photoId', (req, res) => {
    const { photoId } = req.params;
    const query = 'DELETE FROM photo WHERE photoId = ?';
    db.query(query, [photoId], (err, result) => {
        if (err) {
            console.error('Error deleting photo:', err);
            res.status(500).send('Error deleting photo');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Photo not found');
            return;
        }
        res.status(204).send();
    });
});

module.exports = router;