const express = require('express');
const MilestoneModel = require('../models/MilestoneModel');
const router = express.Router();

router.post('/add', (req, res) => {
    const { projectId, milestoneName, dueDate } = req.body;
    MilestoneModel.addMilestone(projectId, milestoneName, dueDate, (err, milestoneId) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Milestone added', milestoneId });
    });
});

router.patch('/:id/status', (req, res) => {
    const { status } = req.body;
    const milestoneId = req.params.id;
    MilestoneModel.updateStatus(milestoneId, status, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Milestone status updated' });
    });
});

module.exports = router;
