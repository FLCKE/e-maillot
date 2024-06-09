const express = require('express');
const router = express.Router();
const db = require('../dbConnexion');

// Route pour ajouter un produit au panier
router.post('/', (req, res) => {
    const { userId, productId } = req.body;
    const query = 'INSERT INTO cart (userId, productId) VALUES (?, ?)';
    db.query(query, [userId, productId], (err, results) => {
        if (err) {
            console.error('Error adding product to cart:', err);
            res.status(500).send('Error adding product to cart');
            return;
        }
        res.status(201).json({ cartId: results.insertId, userId, productId });
    });
});

// Route pour récupérer tous les produits du panier d'un utilisateur
router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    const query = 'SELECT * FROM cart WHERE userId = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching cart items:', err);
            res.status(500).send('Error fetching cart items');
            return;
        }
        res.json(results);
    });
});

// Route pour supprimer un produit du panier
router.delete('/:cartId', (req, res) => {
    const { cartId } = req.params;
    const query = 'DELETE FROM cart WHERE cartId = ?';
    db.query(query, [cartId], (err, results) => {
        if (err) {
            console.error('Error removing product from cart:', err);
            res.status(500).send('Error removing product from cart');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Cart item not found');
            return;
        }
        res.status(204).send();
    });
});

// Route pour supprimer tous les articles du panier d'un utilisateur
router.delete('/clear/:userId', (req, res) => {
    const { userId } = req.params;
    const query = 'DELETE FROM cart WHERE userId = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error clearing cart:', err);
            res.status(500).send('Error clearing cart');
            return;
        }
        res.status(204).send();
    });
});

module.exports = router;