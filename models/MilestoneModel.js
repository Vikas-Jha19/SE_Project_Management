const db = require('../config/db');

const MilestoneModel = {
    addMilestone: (projectId, milestoneName, dueDate, callback) => {
        const sql = `INSERT INTO milestones (project_id, milestone_name, due_date) VALUES (?, ?, ?)`;
        db.run(sql, [projectId, milestoneName, dueDate], function(err) {
            callback(err, this ? this.lastID : null);
        });
    },

    updateStatus: (milestoneId, status, callback) => {
        const sql = `UPDATE milestones SET status = ? WHERE milestone_id = ?`;
        db.run(sql, [status, milestoneId], (err) => {
            callback(err);
        });
    }
};

module.exports = MilestoneModel;
