import { CustomError } from "./custom.error";
import { ERROR_CODES } from "./errorCodes";

export class InvalidTokenError extends CustomError {
  constructor() {
    super({
      message: 'Invalid token.',
      statusCode: 400,
      errorCode: ERROR_CODES.INVALID_TOKEN,
    })
  }
}