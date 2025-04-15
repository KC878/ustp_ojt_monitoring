import { createServer } from 'node:http';
import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handle);
  const io = new Server(httpServer);

  // User type
  interface User {
    id: string;
    name: string;
  }

  const usersInRooms: Record<string, User[]> = {};

  io.on('connection', (socket) => {
    console.log('User has connected @Lobby: ', socket.id);

    socket.on('join-room', ({ room, name }) => {
      socket.join(room);
      if (!usersInRooms[room]) {
        usersInRooms[room] = [];
      }
      usersInRooms[room].push({ id: socket.id, name });

      console.log(`${name} joined the room ${room}`);
      console.log('🔄 Current connected sockets:', Array.from(io.sockets.sockets.keys()));
      console.log('📜 Users in rooms:', usersInRooms);

      socket.to(room).emit('user-joined', `${name} has joined ${room}`);
    });

    // Listen for user logout
    socket.on('user-logout', () => {
      console.log(`Logout event received for user: ${socket.id}`);
      for (const room in usersInRooms) {
        if (usersInRooms[room]) {
          const index = usersInRooms[room].findIndex(user => user.id === socket.id);
          if (index !== -1) {
            const removedUser = usersInRooms[room].splice(index, 1)[0];
            console.log(`User ${removedUser.name} has logged out from ${room}`);
            socket.to(room).emit('user-left', `${removedUser.name} has left ${room}`);
            break;
          }
        }
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
      for (const room in usersInRooms) {
        if (usersInRooms[room]) {
          const index = usersInRooms[room].findIndex(user => user.id === socket.id);
          if (index !== -1) {
            const removedUser = usersInRooms[room].splice(index, 1)[0];
            console.log(`User ${removedUser.name} has disconnected from ${room}`);
            socket.to(room).emit('user-left', `${removedUser.name} has left ${room}`);
            break;
          }
        }
      }
    });
  });

  httpServer.listen(port, () => {
    console.log('Application started...');
    console.log(`Server running on http://${hostname}:${port}`);
  });
});
