// src/services/useSocket.ts
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useMiddleware } from './useMiddleware';

let socket: Socket;


export const useSocketIO = () => {
  const [socketId, setSocketId] = useState<string | null>(null);
  const { isAuthenticated } = useMiddleware();
  useEffect(() => {
    if (!socket) {
      socket = io(); // initialize once
    }


    if(isAuthenticated){
      socket.on('connect', () => {
        console.log(`Connected! Socket ID: ${socket.id}`);
        setSocketId(socket.id ? socket.id : null);
  
      });
    }
  
    socket.on('disconnect', () => {
      console.log('Disconnected from server.');
      setSocketId(null); // set socket. to null
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, [isAuthenticated]);

  return { socket, socketId };
};
