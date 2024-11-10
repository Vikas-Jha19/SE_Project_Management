const express = require('express');
const InsightsModel = require('../models/InsightsModel');
const router = express.Router();

router.get('/', (req, res) => {
    InsightsModel.getInsights((err, insights) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ insights });
    });
});

module.exports = router;
