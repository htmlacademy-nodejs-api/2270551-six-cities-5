import { ClassConstructor, plainToClass } from 'class-transformer';
import { MiddlewareInterface } from './middleware.interface.js';
import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { StatusCodes } from 'http-status-codes';


export class ValidateDtoMiddleware implements MiddlewareInterface {
  constructor(
    private dto: ClassConstructor<object>
  ) {}

  public async execute(
    { body }: Request, res: Response, next: NextFunction
  ): Promise<void> {
    const dtoInstance = plainToClass(this.dto, body);
    const errors = await validate(dtoInstance);

    if(errors.length) {
      res.status(StatusCodes.BAD_REQUEST).send(errors);

      return;
    }

    next();
  }
}
