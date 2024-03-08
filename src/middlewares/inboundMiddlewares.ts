import express, { Application } from 'express';
import cookieParserMiddleware from 'cookie-parser';
import { authenticationMiddleware } from './authentication.middleware';

export const inboundMiddlewares = (app: Application) => {
  return [
    express.json(),
    cookieParserMiddleware(),
    authenticationMiddleware,
  ];
}