import { join } from "path";
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { Application, NextFunction, Request, Response } from "express";
import { daysToMiliseconds } from "./libs/utils/daysToMilliseconds";
import { WrongCredentialsError } from "./errors/wrongCredentials.error";

export const registerRoutes = (app: Application) => {
  app.get('/home', (req: Request, res: Response) => {
    res.sendFile(join(__dirname, '/pages/home.html'));
  });

  app.get('/login', (req: Request, res: Response) => {
    res.sendFile(join(__dirname, '/pages/login.html'));
  });

  app.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: { email, password }
    });

    if (!user) {
      next(new WrongCredentialsError())
      return;
    }

    const token = jwt.sign(
      { email, password },
      process.env.SECRET ?? ''
    );

    res.cookie('session', token, {
      maxAge: daysToMiliseconds(2),
      secure: process.env.ENV === 'PROD',
      httpOnly: true,
      sameSite: 'strict',
    });

    res.send({ message: 'success' });
  });

  app.post('/logout', (req: Request, res: Response) => {
    res.clearCookie('session');
    res.send({ message: 'success' });
  });
}