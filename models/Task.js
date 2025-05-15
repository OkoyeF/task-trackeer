const { pool } = require('../config/db');

class Task {
  // Get all tasks
  static async getAll() {
    try {
      const result = await pool.query(
        'SELECT * FROM tasks ORDER BY created_at DESC'
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Get task by ID
  static async getById(id) {
    try {
      const result = await pool.query(
        'SELECT * FROM tasks WHERE id = $1',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Create new task
  static async create(taskData) {
    try {
      const { title, description, status, priority } = taskData;
      const result = await pool.query(
        'INSERT INTO tasks (title, description, status, priority) VALUES ($1, $2, $3, $4) RETURNING id',
        [title, description, status, priority]
      );
      return result.rows[0].id;
    } catch (error) {
      throw error;
    }
  }

  // Update task
  static async update(id, taskData) {
    try {
      const { title, description, status, priority } = taskData;
      const result = await pool.query(
        `UPDATE tasks 
         SET title = $1, description = $2, status = $3, priority = $4, updated_at = CURRENT_TIMESTAMP 
         WHERE id = $5
         RETURNING *`,
        [title, description, status, priority, id]
      );
      return result.rowCount > 0;
    } catch (error) {
      throw error;
    }
  }

  // Delete task
  static async delete(id) {
    try {
      const result = await pool.query(
        'DELETE FROM tasks WHERE id = $1',
        [id]
      );
      return result.rowCount > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Task;