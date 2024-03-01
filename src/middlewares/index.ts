import express, { Application } from 'express';
import cookieParserMiddleware from 'cookie-parser';
import { authenticationMiddleware } from './authentication.middleware';
import { errorMiddleware } from './error.middleware';

export const inboundMiddlewares = (app: Application) => {
  return [
    express.json(),
    cookieParserMiddleware(),
    authenticationMiddleware,
  ];
}

export const outboundMiddlewares = (app: Application) => {
  return [
    errorMiddleware,
  ];
}