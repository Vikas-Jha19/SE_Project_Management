const db = require('../config/db');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const UserModel = {
    register: (username, password, role, githubId, callback) => {
        bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
            if (err) return callback(err);

            const sql = `INSERT INTO users (username, password, role, github_id) VALUES (?, ?, ?, ?)`;
            db.run(sql, [username, hashedPassword, role, githubId], function(err) {
                callback(err, this ? this.lastID : null);  
            });
        });
    },

    login: (username, password, callback) => {
        const sql = `SELECT * FROM users WHERE username = ?`;
        db.get(sql, [username], (err, user) => {
            if (err || !user) {
                return callback(err || new Error('User not found'));
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err || !isMatch) {
                    return callback(err || new Error('Invalid password'));
                }
                callback(null, user);
            });
        });
    }
};

module.exports = UserModel;
