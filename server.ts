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


  const usersInRooms: Record<string, User[]>= {};

  io.on('connection', (socket) => {
    console.log('User has connected @Lobby: ', socket.id);
    // Log how many clients are connected right now

    
    socket.on('join-room', ({room, name}) => {
      socket.join(room);
      if (!usersInRooms[room]){
        usersInRooms[room] = [];
      }

      usersInRooms[room].push({ id: socket.id, name });

      console.log(`User ${name} joined the room ${room}`);
      
      console.log('🔄 Current connected sockets:', Array.from(io.sockets.sockets.keys()));
      console.log('📜 Users in rooms:', usersInRooms);
      
      socket.to(room).emit('user-joined', `${name} has joined ${room}`)
    })
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    })
     
  });



  httpServer.listen(port, () => {
    console.log(`Server running pon http://${hostname}:${port}`);
  });
})