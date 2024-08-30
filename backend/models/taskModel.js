const db = require('../config/db');

class Task {
    static getAllTasks(callback) {
        const sql = 'SELECT * FROM tasks';
        db.query(sql, callback);
    }

    static getTaskById(id, callback) {
        const sql = 'SELECT * FROM tasks WHERE id = ?';
        db.query(sql, [id], callback);
    }

    static createTask(task, callback) {
        const sql = 'INSERT INTO tasks SET ?';
        db.query(sql, task, callback);
    }

    static updateTask(id, task, callback) {
        const sql = 'UPDATE tasks SET ? WHERE id = ?';
        db.query(sql, [task, id], callback);
    }

    static deleteTask(id, callback) {
        const sql = 'DELETE FROM tasks WHERE id = ?';
        db.query(sql, [id], callback);
    }
}

module.exports = Task;
