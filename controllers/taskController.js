const Task = require('../models/Task');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.getAll();
    res.render('tasks', { 
      title: 'All Tasks',
      tasks 
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).render('tasks', { 
      title: 'All Tasks',
      tasks: [],
      error: 'Failed to load tasks' 
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.getAll();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.getById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Failed to fetch task' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    
    const newTaskId = await Task.create({
      title,
      description: description || '',
      status: status || 'pending',
      priority: priority || 'medium'
    });
    
    res.status(201).json({ 
      id: newTaskId,
      message: 'Task created successfully' 
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Failed to create task' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    const taskId = req.params.id;
    
    const task = await Task.getById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    const updated = await Task.update(taskId, {
      title: title || task.title,
      description: description !== undefined ? description : task.description,
      status: status || task.status,
      priority: priority || task.priority
    });
    
    if (updated) {
      res.status(200).json({ message: 'Task updated successfully' });
    } else {
      res.status(400).json({ message: 'Failed to update task' });
    }
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Failed to update task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    
    const task = await Task.getById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    const deleted = await Task.delete(taskId);
    
    if (deleted) {
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(400).json({ message: 'Failed to delete task' });
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Failed to delete task' });
  }
};

exports.home = (req, res) => {
  res.render('index', { title: 'Task Tracker App' });
};