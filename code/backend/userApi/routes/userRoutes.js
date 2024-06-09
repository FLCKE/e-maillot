const express = require('express');
const router = express.Router();
const db = require('../dbConnexion');
router.post('/', (req, res) => {
    const { username, lastname, firstname, email, password, registrationDate, role } = req.body;
    const query = 'INSERT INTO users (username, lastname, firstname, email, password, registrationDate, role) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [username, lastname, firstname, email, password, registrationDate, role], (err, results) => {
        if (err) {
            console.error('Error inserting user:', err);
            res.status(500).send('Error inserting user');
            return;
        }
        res.status(201).json({ userid: results.insertId, username, lastname, firstname, email, password, registrationDate, role });
    });
});
router.get('/', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Error fetching users');
            return;
        }
        res.json(results);
    });
});
router.get('/:userid', (req, res) => {
    const { userid } = req.params;
    const query = 'SELECT * FROM users WHERE userid = ?';
    db.query(query, [userid], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            res.status(500).send('Error fetching user');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('User not found');
            return;
        }
        res.json(results[0]);
    });
});
router.put('/:userid', (req, res) => {
    const { userid } = req.params;
    const { username, lastname, firstname, email, registrationDate } = req.body;
    const query = 'UPDATE users SET username = ?, lastname = ?, firstname = ?, email = ?, registrationDate = ? WHERE userid = ?';
    db.query(query, [username, lastname, firstname, email, registrationDate, userid], (err, results) => {
        if (err) {
            console.error('Error updating user:', err);
            res.status(500).send('Error updating user');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('User not found');
            return;
        }
        res.json({ userid, username, lastname, firstname, email, registrationDate });
    });
});
router.delete('/:userid', (req, res) => {
    const { userid } = req.params;
    const query = 'DELETE FROM users WHERE userid = ?';
    db.query(query, [userid], (err, results) => {
        if (err) {
            console.error('Error deleting user:', err);
            res.status(500).send('Error deleting user');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('User not found');
            return;
        }
        res.status(204).send();
    });
});

module.exports = router;