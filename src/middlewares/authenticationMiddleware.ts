import { NextFunction, Request as Request, Response } from "express";
import jwt from 'jsonwebtoken';
import getFromEnv from "../utils/env.utils";

export const authenticationMiddleware = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  console.log('>>> Request passing through Authentication Middleware...');
  
  if (req.path === '/login') {
    return next();
  }

  const sessionToken = req.cookies.session;
  
  if (!sessionToken) {
    throw new Error('Missing cookie');
  }

  try {
    jwt.verify(sessionToken, getFromEnv('SECRET'));
  } catch (e) {
    throw new Error('Invalid token');
  }

  return next();
}