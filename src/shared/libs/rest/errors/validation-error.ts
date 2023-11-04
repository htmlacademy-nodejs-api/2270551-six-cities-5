import {StatusCodes} from 'http-status-codes';

import {ValidationErrorField} from '../types/index.js';
import HttpError from '../errors/http-error.js';

export default class ValidationError extends HttpError {
  public details: ValidationErrorField[];

  constructor(message: string, errors: ValidationErrorField[]) {
    super(StatusCodes.BAD_REQUEST, message);
    this.details = errors;
  }
}
