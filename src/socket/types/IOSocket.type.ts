import { Socket } from "socket.io";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "../interfaces";

export type IOSocket =  Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>