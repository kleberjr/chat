import { Server as HttpServer, Server } from "http";

export const createSocketServer = (httpServer: HttpServer) => {
  const io = new Server(httpServer);

  // TODO: initialize data structures

  io.on('connection', () => {
    console.log('A connection was established.');
  })
}