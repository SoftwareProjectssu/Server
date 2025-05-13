import { Server as SocketIO } from 'socket.io';
import { connectHandler } from '../handlers/userHandler.js';

const initSocket = (server) => {
  const io = new SocketIO();
  io.attach(server);

  connectHandler(io);

  return io;
};

export default initSocket;
