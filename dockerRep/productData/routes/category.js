const express = require('express');
const router = express.Router();
const db = require('../dbConnexion');

// Route pour ajouter une nouvelle catégorie
router.post('/', (req, res) => {
    const { categoryName } = req.body;
    const query = 'INSERT INTO category (categoryName) VALUES (?)';
    db.query(query, [categoryName], (err, result) => {
        if (err) {
            console.error('Error adding category:', err);
            res.status(500).send('Error adding category');
            return;
        }
        res.status(201).json({ categoryId: result.insertId, categoryName });
    });
});

// Route pour récupérer toutes les catégories
router.get('/', (req, res) => {
    const query = 'SELECT * FROM category';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching categories:', err);
            res.status(500).send('Error fetching categories');
            return;
        }
        res.json(results);
    });
});

// Route pour récupérer une catégorie spécifique
router.get('/:categoryId', (req, res) => {
    const { categoryId } = req.params;
    const query = 'SELECT * FROM category WHERE categoryId = ?';
    db.query(query, [categoryId], (err, results) => {
        if (err) {
            console.error('Error fetching category:', err);
            res.status(500).send('Error fetching category');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Category not found');
            return;
        }
        res.json(results[0]);
    });
});

// Route pour mettre à jour une catégorie
router.put('/:categoryId', (req, res) => {
    const { categoryId } = req.params;
    const { categoryName } = req.body;
    const query = 'UPDATE category SET categoryName = ? WHERE categoryId = ?';
    db.query(query, [categoryName, categoryId], (err, result) => {
        if (err) {
            console.error('Error updating category:', err);
            res.status(500).send('Error updating category');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Category not found');
            return;
        }
        res.json({ categoryId, categoryName });
    });
});

// Route pour supprimer une catégorie
router.delete('/:categoryId', (req, res) => {
    const { categoryId } = req.params;
    const query = 'DELETE FROM category WHERE categoryId = ?';
    db.query(query, [categoryId], (err, result) => {
        if (err) {
            console.error('Error deleting category:', err);
            res.status(500).send('Error deleting category');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Category not found');
            return;
        }
        res.status(204).send();
    });
});

module.exports = router;