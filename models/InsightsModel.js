const db = require('../config/db');

const InsightsModel = {
    getInsights: (callback) => {
        const sql = `SELECT * FROM insights`;
        db.all(sql, [], (err, rows) => {
            callback(err, rows);
        });
    }
};

module.exports = InsightsModel;
