'use strict';

const mongoose = require('mongoose');
const Task = mongoose.model('Tasks');

// List all tasks
exports.list_all_tasks = async function(req, res) {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

// Create a task
exports.create_a_task = async function(req, res) {
  try {
    const new_task = new Task(req.body);
    const saved = await new_task.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Bad request', details: err.message });
  }
};

// Read a task by id
exports.read_a_task = async function(req, res) {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Bad request', details: err.message });
  }
};

// Update a task by id
exports.update_a_task = async function(req, res) {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.taskId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Task not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Bad request', details: err.message });
  }
};

// Delete a task by id
exports.delete_a_task = async function(req, res) {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.taskId);
    if (!deleted) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task successfully deleted' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Bad request', details: err.message });
  }
};