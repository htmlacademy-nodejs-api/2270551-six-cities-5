import {NextFunction, Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {LoggerInterface} from '../../logger/logger.interface.js';
import ExceptionFilter from '../../../libs/rest/exception-filters/exception-filter.js';
import {AppComponent} from './../../../../shared/types/component.enum.js';
import {BaseAuthException} from './errors/index.js';

@injectable()
export class AuthExceptionFilter implements ExceptionFilter {
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
