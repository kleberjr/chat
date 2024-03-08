import { Application } from 'express';
import { errorMiddleware } from './error.middleware';

export const outboundMiddlewares = (app: Application) => {
  return [
    errorMiddleware,
  ];
}