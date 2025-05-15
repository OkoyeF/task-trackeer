const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Web routes (render views)
router.get('/', taskController.home);
router.get('/tasks', taskController.getAllTasks);

// API routes
router.get('/api/tasks', taskController.getTasks);
router.get('/api/tasks/:id', taskController.getTask);
router.post('/api/tasks', taskController.createTask);
router.put('/api/tasks/:id', taskController.updateTask);
router.delete('/api/tasks/:id', taskController.deleteTask);

module.exports = router;