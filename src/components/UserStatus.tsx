import { useSocketIO } from '@src/services/useSocketIO';

const UserStatus = () => {
  const { socketId } = useSocketIO();

  return (
    <div>
      {socketId ? `Online: ${socketId}` : 'Offline'}
    </div>
  );
};

export default UserStatus;
