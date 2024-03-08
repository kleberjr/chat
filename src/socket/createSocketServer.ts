import { Server as HttpServer } from "http";
import { emit } from "process";
import { Server as IOServer, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";


export const createSocketServer = async (httpServer: HttpServer) => {
  const io = new IOServer(httpServer);

  // TODO: initialize data structures

  io.on('connection', async (socket) => {
    console.log('');
    console.log(`WS: A connection was established (${socket.id}).`);

    socket.on('chat message', async (msg) => {
      console.log('');
      console.log(`>> (${socket.id}) mensagem recebida: ${msg.message}`);

      // propaga o evento para todos os clients-sockets conectados no servidor
      // io.emit('chat message', {
      //   author: await getCurrentUser(socket),
      //   message: msg.message,
      // });
    })
  })
}
