const pool = require('../config/db');

class Task {
    static async getAllTasks(userId, filters = {}) {
        try {
            let query = 'SELECT * FROM tasks WHERE user_id = $1 AND is_deleted = FALSE';
            const params = [userId];
            let paramCount = 1;

            // Add status filter if provided
            if (filters.status) {
                paramCount++;
                query += ` AND status = $${paramCount}`;
                params.push(filters.status);
            }

            // Add search by title if provided
            if (filters.search) {
                paramCount++;
                query += ` AND title ILIKE $${paramCount}`;
                params.push(`%${filters.search}%`);
            }

            // Add pagination
            const limit = filters.limit || 10;
            const offset = filters.offset || 0;
            paramCount++;
            query += ` ORDER BY created_at DESC LIMIT $${paramCount}`;
            params.push(limit);
            paramCount++;
            query += ` OFFSET $${paramCount}`;
            params.push(offset);

            const result = await pool.query(query, params);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    static async getTaskById(id, userId) {
        try {
            const query = 'SELECT * FROM tasks WHERE id = $1 AND user_id = $2 AND is_deleted = FALSE';
            const result = await pool.query(query, [id, userId]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async createTask(task) {
        try {
            const query = `
                INSERT INTO tasks (title, description, status, due_date, user_id)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *
            `;
            const values = [
                task.title,
                task.description || null,
                task.status || 'pending',
                task.due_date || null,
                task.user_id
            ];
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async updateTask(id, userId, task) {
        try {
            const fields = [];
            const values = [];
            let paramCount = 0;

            if (task.title !== undefined) {
                paramCount++;
                fields.push(`title = $${paramCount}`);
                values.push(task.title);
            }
            if (task.description !== undefined) {
                paramCount++;
                fields.push(`description = $${paramCount}`);
                values.push(task.description);
            }
            if (task.status !== undefined) {
                paramCount++;
                fields.push(`status = $${paramCount}`);
                values.push(task.status);
            }
            if (task.due_date !== undefined) {
                paramCount++;
                fields.push(`due_date = $${paramCount}`);
                values.push(task.due_date);
            }

            if (fields.length === 0) {
                throw new Error('No fields to update');
            }

            paramCount++;
            values.push(id);
            paramCount++;
            values.push(userId);

            const query = `
                UPDATE tasks
                SET ${fields.join(', ')}
                WHERE id = $${paramCount - 1} AND user_id = $${paramCount} AND is_deleted = FALSE
                RETURNING *
            `;

            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async deleteTask(id, userId, softDelete = true) {
        try {
            let query;
            if (softDelete) {
                query = 'UPDATE tasks SET is_deleted = TRUE WHERE id = $1 AND user_id = $2 AND is_deleted = FALSE RETURNING *';
            } else {
                query = 'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *';
            }
            const result = await pool.query(query, [id, userId]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async getTaskCount(userId, filters = {}) {
        try {
            let query = 'SELECT COUNT(*) FROM tasks WHERE user_id = $1 AND is_deleted = FALSE';
            const params = [userId];
            let paramCount = 1;

            if (filters.status) {
                paramCount++;
                query += ` AND status = $${paramCount}`;
                params.push(filters.status);
            }

            if (filters.search) {
                paramCount++;
                query += ` AND title ILIKE $${paramCount}`;
                params.push(`%${filters.search}%`);
            }

            const result = await pool.query(query, params);
            return parseInt(result.rows[0].count);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Task;
