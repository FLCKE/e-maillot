const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../dbConnexion');
router.post('/', (req, res) => {
    const { username, lastname, firstname, email, password, registrationDate, role } = req.body;
    hashPassword(password).then((result) => {
        if (result) {
            const query = 'INSERT INTO users (username, lastname, firstname, email, password, registrationDate, role) VALUES (?, ?, ?, ?, ?, ?, ?)';
            db.query(query, [username, lastname, firstname, email, result, registrationDate, role], (err, results) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    res.status(500).send('Error inserting user');
                    return;
                }
                res.status(201).json({ userid: results.insertId, username, lastname, firstname, email, password, registrationDate, role });
            });
        }
    })

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
router.get('/login', (req, resp) => {
    console.log('fffffffffffffffffffffffffffffff');
    let email = req.query.email;
    console.log(email);
    let password = req.query.password;
    let requete = "SELECT * from `users` WHERE  `email`= '" + email + "'";

    db.query(requete, (err, result) => {
        if (err) {
            console.log(err);
            return err;
        } else {
            console.log(result);
            checkPassword(password, result[0].password).then((chechResult) => {
                if (chechResult) {

                    resp.send(
                        {
                            message: 'user ',
                            data: result,
                        }
                    )
                    console.log("data reclaim");
                } else {
                    console.log("introuvable");
                    resp.status(400).json({ message: "echec" });
                    return err = new Error("pas trouver");
                }
            })
            // if (result.length != 0) {
            // }
        }
    })
})
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
    const { username, lastname, firstname, email } = req.body;
    const query = 'UPDATE users SET username = ?, lastname = ?, firstname = ?, email = ? WHERE userid = ?';
    db.query(query, [username, lastname, firstname, email, userid], (err, results) => {
        if (err) {
            console.error('Error updating user:', err);
            res.status(500).send('Error updating user');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('User not found');
            return;
        }
        res.json({ userid, username, lastname, firstname, email });

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
//hasher le mot de passe
async function hashPassword(password) {
    var hashed = await bcrypt.hash(password, 10);
    return hashed;
}
//Comparer deux mots de passe (celui entrer par l'utilisateur et celui stocker dans la base de donnée)
async function checkPassword(password, hashed) {
    var result = await bcrypt.compare(password, hashed);
    return result;
}

module.exports = router;