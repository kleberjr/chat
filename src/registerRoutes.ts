import { join } from "path";
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import { daysToMiliseconds } from "./utils/date.utils";

export const registerRoutes = (app: any) => {
  app.get('/', (req: Request, res: Response) => {
    res.sendFile(join(__dirname, '/pages/index.html'));
  });

  app.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log('>>> email:', email);
    console.log('>>> password:', password);

    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: { email, password }
    });

    if (!user) {
      throw new Error('Wrong credentials');
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

  app.post('/logout', async (req: Request, res: Response) => {
    res.clearCookie('session');
    res.send({ message: 'sucess' });
  });
}