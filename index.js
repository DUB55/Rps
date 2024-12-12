const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// CORS configuration
app.use(cors({
  origin: ['https://dub5.zapto.org', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true
}));

const io = socketIo(server, {
  cors: {
    origin: ['https://dub5.zapto.org', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
