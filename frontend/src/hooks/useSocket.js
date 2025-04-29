/*import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export function useSocket(onStatus) {
  const socket = useRef();
  useEffect(() => {
    socket.current = io('http://localhost:4000');
    socket.current.on('order:status', onStatus);
    return () => socket.current.disconnect();
  }, [onStatus]);
}
*/