import { CustomError } from "./custom.error";
import { ERROR_CODES } from "./errorCodes";

export class MissingCookieError extends CustomError {
  constructor() {
    super({
      message: 'Missing cookie.',
      statusCode: 400,
      errorCode: ERROR_CODES.MISSING_COOKIE,
    })
  }
}