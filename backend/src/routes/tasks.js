const express = require('express');
const router = express.Router();

const {
  getTasks,
  createTask,
  updateTask
} = require('../controller/taskController');

// routes
router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);

module.exports = router;