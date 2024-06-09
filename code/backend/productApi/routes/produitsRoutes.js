const express = require('express');
const router = express.Router();
const db = require('../dbConnexion');

// Route pour ajouter un nouveau produit
router.post('/', (req, res) => {
    const { productName, Price, remainInStocks, categoryId } = req.body;
    const query = 'INSERT INTO products (productName, Price, remainInStocks, categoryId) VALUES (?, ?, ?, ?)';
    db.query(query, [productName, Price, remainInStocks, categoryId], (err, result) => {
        if (err) {
            console.error('Error adding product:', err);
            res.status(500).send('Error adding product');
            return;
        }
        res.status(201).json({ productId: result.insertId, productName, Price, remainInStocks, categoryId });
    });
});

// Route pour récupérer tous les produits
router.get('/', (req, res) => {
    const query = 'SELECT * FROM products';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).send('Error fetching products');
            return;
        }
        res.json(results);
    });
});

// Route pour récupérer un produit spécifique
router.get('/:productId', (req, res) => {
    const { productId } = req.params;
    const query = 'SELECT * FROM products WHERE productId = ?';
    db.query(query, [productId], (err, results) => {
        if (err) {
            console.error('Error fetching product:', err);
            res.status(500).send('Error fetching product');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Product not found');
            return;
        }
        res.json(results[0]);
    });
});

// Route pour mettre à jour un produit
router.put('/:productId', (req, res) => {
    const { productId } = req.params;
    const { productName, Price, remainInStocks, categoryId } = req.body;
    const query = 'UPDATE products SET productName = ?, Price = ?, remainInStocks = ?, categoryId = ? WHERE productId = ?';
    db.query(query, [productName, Price, remainInStocks, categoryId, productId], (err, result) => {
        if (err) {
            console.error('Error updating product:', err);
            res.status(500).send('Error updating product');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Product not found');
            return;
        }
        res.json({ productId, productName, Price, remainInStocks, categoryId });
    });
});

// Route pour supprimer un produit
router.delete('/:productId', (req, res) => {
    const { productId } = req.params;
    const query = 'DELETE FROM products WHERE productId = ?';
    db.query(query, [productId], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            res.status(500).send('Error deleting product');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Product not found');
            return;
        }
        res.status(204).send();
    });
});

module.exports = router;