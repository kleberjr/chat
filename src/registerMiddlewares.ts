import express from 'express';
import cookieParserMiddleware from 'cookie-parser';
import { authenticationMiddleware } from "./middlewares/authenticationMiddleware";
import { testMiddleware } from "./middlewares/testMiddleware";

export const registerMiddlewares = (app: any) => {
  app.use(express.json())
  app.use(cookieParserMiddleware());
  app.use(authenticationMiddleware);
  app.use(testMiddleware);
}