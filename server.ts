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
  io.on('connection', (socket) => {
    console.log('A user has connected from Server: ', socket.id);

    socket.on('userOnline', (data) => {
      console.log('User connected payload:', data); // 🧠 contains userId, name
    });

  });

    // socket.on('disconnect', () => {
    //   console.log(`User disconnected from Server: ${socket.id}`);
    // });


  httpServer.listen(port, () => {
    console.log(`Server running pon http://${hostname}:${port}`);
  });
})