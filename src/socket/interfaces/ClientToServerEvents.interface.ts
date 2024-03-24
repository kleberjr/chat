import { CommonEvents } from "./CommonEvents.interface";

export interface ClientToServerEvents extends CommonEvents {
  chatMessage(message: string): void;
}