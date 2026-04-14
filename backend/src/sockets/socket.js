const { Server } = require('socket.io');

let io;

function initSocket(server, app) {
  io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  app.set('io', io);

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}

function getIO() {
  if (!io) throw new Error('Socket not initialized');
  return io;
}

module.exports = { initSocket, getIO };