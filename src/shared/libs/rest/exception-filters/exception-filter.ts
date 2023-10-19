import { StatusCodes } from 'http-status-codes';
import { LoggerInterface } from './../../logger/logger.interface.js';
import { AppComponent } from '../../../types/component.enum.js';
import { ExceptionFilterInterface } from './exception-filter.interface.js';
import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import HttpError from '../errors/http-error.js';
import { createErrorObject } from '../../../helpers/common.js';

@injectable()
export default class ExceptionFilter implements ExceptionFilterInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface
  ) {
    this.logger.info('Register exceptionFilter');
  }

  private handleHttpError(error: HttpError, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(error.message, error);
    res
      .status(error.httpStatusCode)
      .json(createErrorObject(error.message));
  }

  private handleOtherError(error: Error, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(error.message, error);

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(error.message));
  }

  public catch(error: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
    if (error instanceof HttpError) {
      return this.handleHttpError(error, req, res, next);
    }

    this.handleOtherError(error, req, res, next);
  }

}