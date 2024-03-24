import { Server as HttpServer } from "http";
import { DisconnectReason, Server as IOServer } from "socket.io";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "./interfaces";
import { IOSocket, UserPayload } from "./types";
import { InvalidTokenError, MissingCookieError } from "../errors";
import jwt from 'jsonwebtoken';
import { getFromEnv } from "../libs/utils";


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

    socket.on('chatMessage', (message: string) => {
      const userPayload = getUserPayload(socket);

      // Broadcast the message to every socket but this one
      socket.broadcast.emit('chatMessage', userPayload, message);
    });

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

const getUserPayload = (socket: IOSocket): UserPayload => {
  const cookie = socket.request.headers.cookie;

  if (!cookie) {
    throw new MissingCookieError();
  }

  const [cookieName, cookieValue] = cookie.split('=');

  try {
    const payload = jwt.verify(cookieValue, getFromEnv('SECRET'));
    
    return {
      id: payload['id'],
      name: payload['name'],
      email: payload['email'],
    };
  } catch (e) {
    throw new InvalidTokenError();
  }
}