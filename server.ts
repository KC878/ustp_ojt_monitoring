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

  interface User {
    id: string;
    name: string;
  }

  const usersInRooms: Record<string, User[]> = {};

  io.on('connection', (socket) => {
    console.log('🔌 User connected:', socket.id);

    socket.on('join-room', ({ room, name }) => {
      socket.join(room);

      // Initialize room if it doesn't exist
      if (!usersInRooms[room]) {
        usersInRooms[room] = [];
      }

      // Add user to room if not already in it
      if (!usersInRooms[room].some(user => user.id === socket.id)) {
        usersInRooms[room].push({ id: socket.id, name });
      }

      console.log(`✅ ${name} joined room ${room}`);
      console.log('🧍 Users in rooms:', usersInRooms);

      socket.to(room).emit('user-joined', `${name} has joined ${room}`);

    
    });

      // Logout handler
    socket.on('logout', () => {
      for (const room in usersInRooms) {
        const index = usersInRooms[room].findIndex(user => user.id === socket.id);
        if (index !== -1) {
          const removedUser = usersInRooms[room].splice(index, 1)[0];
          console.log(`🚪 ${removedUser.name} logged out from room ${room}`);
          socket.to('Logicbase').emit('user-logout', `${removedUser.name} has left ${room}`);
          socket.leave('Logicbase');
          break;
        }
      }
    });

    // Disconnect handler
    socket.on('disconnect', () => {
      console.log(`❌ Disconnected: ${socket.id}`);

      for (const room in usersInRooms) {
        const index = usersInRooms[room].findIndex(user => user.id === socket.id);
        if (index !== -1) {
          const removedUser = usersInRooms[room].splice(index, 1)[0];
          console.log(`🛑 ${removedUser.name} disconnected from room ${room}`);
          socket.to(room).emit('user-left', `${removedUser.name} has left ${room}`);
        }
      }

      socket.disconnect();
    });
  });

  httpServer.listen(port, () => {
    console.log(`🚀 Server running on http://${hostname}:${port}`);
  });
});
