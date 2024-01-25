import { Server } from "socket.io";

const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../front/index.html'));
});

io.on('connection', (socket) => {
  console.log('A user connected!');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user left!')
  });
});

server.listen(3000, () => {
  console.log('🚀 Server is running at http://localhost:3000');
});