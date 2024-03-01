export type CustomErrorParams = {
  message: string;
  statusCode: number;
  errorCode: number;
}

export class CustomError extends Error {
  statusCode: number;
  errorCode: number;

  constructor({ message, statusCode, errorCode }: CustomErrorParams) {
    super(message);

    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}