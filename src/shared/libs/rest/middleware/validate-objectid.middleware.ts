import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {Types} from 'mongoose';
import HttpError from '../errors/http-error.js';
import {MiddlewareInterface} from './middleware.interface.js';

export class ValidateObjectIdMiddleware implements MiddlewareInterface{
  constructor(private param: string) {}

  public async execute({params}: Request, _res: Response, next: NextFunction) {
    const objectId = params[this.param];

    if(Types.ObjectId.isValid(objectId)){
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `${objectId} is invalid ObjectId`,
      'ValidateObjectIdMiddleware'
    );
  }
}
