import { Application, Request, Response } from "express";
import { join } from "path";

export const registerBaseRoutes = (app: Application) => {
  app.get('/home', (req: Request, res: Response) => {
    res.sendFile(join(__dirname, '/pages/home.html'));
  });
}