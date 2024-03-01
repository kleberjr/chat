import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom.error";

export const errorMiddleware = (
  err: CustomError, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  console.log(err.stack);
  
  res.status(err.statusCode).send({ 
    message: err.message, 
    code: err.errorCode 
  });

  next();
}