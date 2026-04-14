require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');

const { initSocket } = require('./sockets/socket');
const initDB = require('./config/initDB');

const taskRoutes = require('./routes/tasks');
const statusRoutes = require('./routes/statuses');

const app = express();
const server = http.createServer(app);

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/tasks', taskRoutes);
app.use('/api/statuses', statusRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'PawnHero Task API is running' });
});

// socket init
initSocket(server, app);

const PORT = process.env.PORT || 5000;

// DB init then start server
initDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});