const Task = require('../models/taskModel');

exports.getTasks = (req, res) => {
    Task.getAllTasks((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

exports.getTask = (req, res) => {
    const id = req.params.id;
    Task.getTaskById(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(results[0]);
    });
};

exports.createTask = (req, res) => {
    const newTask = req.body;
    Task.createTask(newTask, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, ...newTask });
    });
};

exports.updateTask = (req, res) => {
    const id = req.params.id;
    const updatedTask = req.body;
    Task.updateTask(id, updatedTask, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ id, ...updatedTask });
    });
};

exports.deleteTask = (req, res) => {
    const id = req.params.id;
    Task.deleteTask(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(204).json();
    });
};
