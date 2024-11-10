const express = require('express');
const router = express.Router();
const db = require('../config/db');
const ProjectModel = require('../models/ProjectModel');
const authenticateToken = require('../middleware/authenticateToken');


router.post('/', authenticateToken, (req, res) => {
    const { project_name } = req.body;
    const { id: userId, role } = req.user; 

    if (!project_name) {
        return res.status(400).json({ message: "Project name is required" });
    }


    ProjectModel.createProject(project_name, userId, role, (err, projectId) => {
        if (err) {
            return res.status(500).json({ message: "Error creating project", error: err.message });
        }
        res.status(201).json({ message: "Project created successfully", projectId });
    });
});

router.get('/', authenticateToken, (req, res) => {
    const sql = 'SELECT * FROM projects'; 
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching projects', error: err.message });
        }
        res.json({ projects: rows });
    });
});


module.exports = router;
