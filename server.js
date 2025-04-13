// server.js
const express = require('express');
const next = require('next');
const http = require('http');
const socketIo = require('socket.io');

// Set up Next.js
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Create a basic Express server
app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);

  // Initialize Socket.IO
  const io = socketIo(httpServer);

  // Handle incoming WebSocket connections
  io.on('connection', (socket) => {
    console.log('New WebSocket connection');
    socket.emit('message', 'Welcome to the Socket.IO server!');

    socket.on('chatMessage', (msg) => {
      console.log('Received message: ' + msg);
      io.emit('chatMessage', msg); // Broadcast the message to all clients
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  // Handle Next.js routes
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start the server on port 3000
  httpServer.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
