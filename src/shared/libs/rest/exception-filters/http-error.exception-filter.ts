import {NextFunction, Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Error} from 'mongoose';

import {createErrorObject} from '../../../helpers/index.js';
import { AppComponent } from '../../../../shared/types/index.js';
import {LoggerInterface} from '../../logger/index.js';
import HttpError from '../errors/http-error.js';
import {ApplicationErrors} from '../types/index.js';
import {ExceptionFilterInterface} from './exception-filter.interface.js';

@injectable()
export class HttpExceptionFilter implements ExceptionFilterInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
  ) {
    this.logger.info('Init HttpErrorExceptionFilter');
  }

  public catch(error: Error, req: Request, res: Response, next: NextFunction) {
    if(!(error instanceof HttpError)) {
      return next(error);
    }

    this.logger.error(`[HttpErrorException]: ${req.path} # ${error.message}`, error);

    res
      .status(error.httpStatusCode)
      .json(createErrorObject(ApplicationErrors.CommonError, error.message));
  }
}
