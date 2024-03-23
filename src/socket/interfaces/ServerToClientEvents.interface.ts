import { CommonEvents } from "./CommonEvents.interface";

export interface ServerToClientEvents extends CommonEvents {
  enableStateRecovery: () => void;
}