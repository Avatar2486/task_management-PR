const Task = require('../models/taskModel');

exports.getTasks = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const filters = {
            status: req.query.status,
            search: req.query.search,
            limit: parseInt(req.query.limit) || 10,
            offset: parseInt(req.query.offset) || 0
        };

        const tasks = await Task.getAllTasks(userId, filters);
        const total = await Task.getTaskCount(userId, { status: filters.status, search: filters.search });

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks,
            pagination: {
                total,
                limit: filters.limit,
                offset: filters.offset,
                pages: Math.ceil(total / filters.limit)
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.getTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userId = req.user.id;

        const task = await Task.getTaskById(id, userId);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found or you do not have permission to access it'
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        next(error);
    }
};

exports.createTask = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const newTask = {
            ...req.body,
            user_id: userId
        };

        const task = await Task.createTask(newTask);

        res.status(201).json({
            success: true,
            data: task,
            message: 'Task created successfully'
        });
    } catch (error) {
        next(error);
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userId = req.user.id;

        const updatedTask = await Task.updateTask(id, userId, req.body);

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: 'Task not found or you do not have permission to update it'
            });
        }

        res.status(200).json({
            success: true,
            data: updatedTask,
            message: 'Task updated successfully'
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userId = req.user.id;

        const deletedTask = await Task.deleteTask(id, userId);

        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                message: 'Task not found or you do not have permission to delete it'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};
