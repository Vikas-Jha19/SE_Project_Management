const express = require('express');
const router = express.Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const UserModel = require('../models/UserModel');

const JWT_SECRET = process.env.JWT_SECRET || 'SE_Project_2024';
const SALT_ROUNDS = 10;


router.post('/register', (req, res) => {
    const { username, password, role, githubId } = req.body;

    UserModel.register(username, password, role, githubId, (err, userId) => {
        if (err) {
            return res.status(500).json({ message: 'Error registering user', error: err.message });
        }
        res.status(201).json({ message: 'User registered successfully', userId });
    });
});



router.post('/login', (req, res) => {
    const { username, password } = req.body;

    UserModel.login(username, password, (err, user) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        const token = jwt.sign(
            { id: user.user_id, username: user.username, role: user.role }, 
            JWT_SECRET, 
            { expiresIn: '1h' }
        );
        res.json({ message: 'Login successful', token });
    });
});



module.exports = router;
