const db = require('../config/db');

const ProjectModel = {
    createProject: (projectName, userId, role, callback) => {
        const sql = `
            INSERT INTO projects (project_name, created_by_student_id, created_by_instructor_id) 
            VALUES (?, ?, ?)
        `;
        const params = [projectName, role === 'student' ? userId : null, role === 'instructor' ? userId : null];
        db.run(sql, params, function(err) {
            callback(err, this ? this.lastID : null);
        });
    },


    assignStudent: (projectId, studentId, callback) => {
        const sql = `INSERT INTO student_projects (project_id, student_id) VALUES (?, ?)`;
        db.run(sql, [projectId, studentId], (err) => {
            callback(err);
        });
    }
};

module.exports = ProjectModel;
