import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { ExceptionFilterInterface } from '../../../libs/rest/index.js';
import { AppComponent } from '../../../types/component.enum.js';
import { LoggerInterface } from '../../logger/logger.interface.js';
import { BaseAuthException } from './errors/index.js';

 @injectable()
export class AuthExceptionFilter implements ExceptionFilterInterface {
  constructor(
     @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface
  ) {
    this.logger.info('Register AuthExceptionFilter');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (! (error instanceof BaseAuthException)) {
      return next(error);
    }

    this.logger.error(`[AuthModule] ${error.message}`, error);
    res.status(error.httpStatusCode)
      .json({
        type: 'AUTHORIZATION',
        error: error.message,
      });
  }
}
