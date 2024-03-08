import { PrismaClient } from "@prisma/client";
import { Application, NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { join } from "path";
import { WrongCredentialsError } from "../errors/wrongCredentials.error";
import { daysToMiliseconds } from "../libs/utils/daysToMilliseconds";

export const registerDevRoutes = (app: Application) => {
  app.post('/dev/login/:userId', async (
    req: Request, 
    res: Response, 
    next: NextFunction
  ) => {
    /* 
      #swagger.tags = ['Dev']
      #swagger.parameters['userId'] = {
        in: 'path',
        required: true,
        type: 'number',
      } 
    */
      const userId: number = Number(req.params['userId']);

      const prisma = new PrismaClient();
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });
  
      if (!user) {
        next(new WrongCredentialsError())
        return;
      }
  
      const token = jwt.sign(
        { email: user.email },
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
}