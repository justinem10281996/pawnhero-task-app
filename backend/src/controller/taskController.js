const pool = require('../database/db');
const { getIO } = require('../sockets/socket');

// GET /api/tasks
exports.getTasks = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM tasks ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    const { task_name } = req.body;

    if (!task_name || task_name.trim() === '') {
      return res.status(400).json({ message: 'task_name is required' });
    }

    const [result] = await pool.query(
      'INSERT INTO tasks (task_name) VALUES (?)',
      [task_name.trim()]
    );

    const [rows] = await pool.query(
      'SELECT * FROM tasks WHERE id=?',
      [result.insertId]
    );

    const newTask = rows[0];

    const io = getIO();
    if (io) io.emit('task:created', newTask);

    res.status(201).json(newTask);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'completed'].includes(status)) {
      return res.status(400).json({
        message: 'Invalid status'
      });
    }

    const [result] = await pool.query(
      'UPDATE tasks SET status=? WHERE id=?',
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    const [rows] = await pool.query(
      'SELECT * FROM tasks WHERE id=?',
      [id]
    );

    const updatedTask = rows[0];

    const io = getIO();
    if (io) io.emit('task:updated', updatedTask);

    res.json(updatedTask);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};