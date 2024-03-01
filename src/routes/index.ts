import { Application } from "express";
import { registerBaseRoutes } from "./base.router";
import { registerAuthRoutes } from "./auth.router";

export const registerRoutes = (app: Application) => {
  registerBaseRoutes(app);
  registerAuthRoutes(app);
}