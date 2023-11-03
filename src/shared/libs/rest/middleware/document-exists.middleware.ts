import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {DocumentExists} from '../../../types/document-exists.interface.js';
import HttpError from '../errors/http-error.js';
import {MiddlewareInterface} from './middleware.interface.js';

export class DocumentExistsMiddleware implements MiddlewareInterface{
  constructor(
    private readonly service: DocumentExists,
    private readonly entityName: string,
    private readonly paramName: string,
  ) {}

  public async execute({params}: Request, _res: Response, next: NextFunction) {
    const documentId = params[this.paramName];

    if(!await this.service.exists(documentId)){
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `${this.entityName} with id: ${documentId} not found`,
        'DocumentExistsMiddleware'
      );
    }

    next();
  }
}
