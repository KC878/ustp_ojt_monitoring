'use client'

// pages/socket-test.tsx
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket: any;

export default function SocketTestPage() {
  const [socketId, setSocketId] = useState<string | null>(null);

  useEffect(() => {
    // Connect to the backend server (same origin)
    socket = io();

    socket.on('connect', () => {
      console.log('Connected to server! ID:', socket.id);
      setSocketId(socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server.');
      setSocketId(null);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🔌 Socket.IO Test Page</h1>
      <p>{socketId ? `✅ Connected with ID: ${socketId}` : '❌ Not connected'}</p>
    </div>
  );
}
