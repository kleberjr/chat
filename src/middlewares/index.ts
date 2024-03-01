import express, { Application } from 'express';
import cookieParserMiddleware from 'cookie-parser';
import { authenticationMiddleware } from './authenticationMiddleware';
import { errorMiddleware } from './errorMiddleware';

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