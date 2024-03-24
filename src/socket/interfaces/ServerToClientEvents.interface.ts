import { UserPayload } from "../types";
import { CommonEvents } from "./CommonEvents.interface";

export interface ServerToClientEvents extends CommonEvents {
  enableStateRecovery: () => void;
  chatMessage(userPayload: UserPayload, message: string): void;
}