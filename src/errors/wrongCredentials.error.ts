import { CustomError } from "./custom.error";
import { ERROR_CODES } from "./errorCodes";

export class WrongCredentialsError extends CustomError {
  constructor() {
    super({
      message: 'Wrong user credentials.',
      statusCode: 400,
      errorCode: ERROR_CODES.WRONG_CREDENTIALS,
    })
  }
}