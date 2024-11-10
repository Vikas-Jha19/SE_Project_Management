const sqlite3 = require('sqlite3').verbose();
const path = require('path');


const db = new sqlite3.Database(path.join(__dirname, '../database/database.db'), (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initializeDatabase(); 
    }
});


const initializeDatabase = () => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL,
            github_id TEXT
        )
    `);
    
    db.run(`
        CREATE TABLE IF NOT EXISTS projects (
            project_id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_name TEXT NOT NULL,
            created_by_student_id INTEGER,
            created_by_instructor_id INTEGER,
            FOREIGN KEY (created_by_student_id) REFERENCES users(user_id),
            FOREIGN KEY (created_by_instructor_id) REFERENCES users(user_id)
        )
    `);
    
    
    db.run(`
        CREATE TABLE IF NOT EXISTS milestones (
            milestone_id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_id INTEGER NOT NULL,
            milestone_name TEXT NOT NULL,
            due_date TEXT NOT NULL,
            status TEXT DEFAULT 'pending',
            FOREIGN KEY (project_id) REFERENCES projects(project_id)
        )
    `);
    
    db.run(`
        CREATE TABLE IF NOT EXISTS student_projects (
            student_id INTEGER NOT NULL,
            project_id INTEGER NOT NULL,
            PRIMARY KEY (student_id, project_id),
            FOREIGN KEY (student_id) REFERENCES users(user_id),
            FOREIGN KEY (project_id) REFERENCES projects(project_id)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS activity_log (
            log_id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER NOT NULL,
            project_id INTEGER NOT NULL,
            activity TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (student_id) REFERENCES users(user_id),
            FOREIGN KEY (project_id) REFERENCES projects(project_id)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS insights (
            insight_id INTEGER PRIMARY KEY AUTOINCREMENT,
            data TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
};

module.exports = db;
