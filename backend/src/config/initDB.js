const pool = require('../database/db');

async function initDB() {
  const conn = await pool.getConnection();

  // statuses table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS statuses (
      status_id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) UNIQUE,
      label VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await conn.query(`
    INSERT INTO statuses (name, label)
    VALUES ('pending','Pending'), ('completed','Completed')
    ON DUPLICATE KEY UPDATE label=VALUES(label)
  `);

  // tasks table
  await conn.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      task_name VARCHAR(255),
      status ENUM('pending','completed') DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  conn.release();
  console.log('✅ DB Ready');
}

module.exports = initDB;