const pool = require('../database/db');

// GET /api/statuses
exports.getStatuses = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM statuses ORDER BY status_id ASC'
    );

    res.status(200).json(rows);

  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};