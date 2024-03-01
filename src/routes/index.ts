import { Application } from "express";
import { registerBaseRoutes } from "./baseRouter";
import { registerAuthRoutes } from "./authRouter";

export const registerRoutes = (app: Application) => {
  registerBaseRoutes(app);
  registerAuthRoutes(app);
}