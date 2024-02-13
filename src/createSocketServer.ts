import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

export const createSocketServer = (httpServer: HttpServer) => {
  const io = new IOServer(httpServer);

  // TODO: initialize data structures

  io.on('connection', () => {
    console.log('WS: A connection was established.');
  })
}