const mysql = require('mysql2/promise');

const taskSchema = new mysql.Schema({
  task_name: {
    type: String,
    required: [true, 'Task name is required'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mysql.model('Task', taskSchema);
