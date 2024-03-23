import { Server as HttpServer } from "http";
import { DisconnectReason, Server as IOServer } from "socket.io";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "./interfaces";
import { IOSocket } from "./types";

export const startSocketServer = async (httpServer: HttpServer) => {
  const io = 
    new IOServer<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >(
      httpServer, 
      { connectionStateRecovery: {} }
    );

  io.on('connection', (socket: IOSocket) => {
    if (socket.recovered) {
      console.log(`Socket ${socket.id} reconnected to server\n`);
    } else {
      console.log(`Socket ${socket.id} connected to server\n`);
    }

    enableStateRecovery(socket);
    
    socket.on('disconnect', (reason: DisconnectReason, descriptions?: any) => {
      console.log(`Socket ${socket.id} disconnected from server: ${reason}`);
      console.log(`Descriptions: ${descriptions}\n`);
    });
  });
};

const enableStateRecovery = (socket: IOSocket) => {
  // The server needs to emit at least one event in order for connection state recory to work 
  socket.emit('enableStateRecovery');
};