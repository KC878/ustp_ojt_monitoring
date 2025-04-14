

import { useEffect } from 'react';
import socket from '@src/utils/socket';

export default function SocketClient({ userID }: { userID: string }) {
  useEffect(() => {
    socket.emit('set-user-id', userID);
    socket.emit('user-login', userID);

    return () => {
      socket.disconnect();
    };
  }, [userID]);

  return null;
}
