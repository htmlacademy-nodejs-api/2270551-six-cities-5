import { ClassConstructor, plainToClass } from 'class-transformer';
import { MiddlewareInterface } from './middleware.interface.js';
import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { ValidationError } from '../errors/index.js';
import { reduceValidationErrors } from '../../../helpers/index.js';


export class ValidateDtoMiddleware implements MiddlewareInterface {
  constructor(
    private dto: ClassConstructor<object>
  ) {}

  public async execute({ body, path }: Request, _res: Response, next: NextFunction): Promise<void> {
    const dtoInstance = plainToClass(this.dto, body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      throw new ValidationError(`Validation error: ${path}`, reduceValidationErrors(errors));

    }

    next();
  }
}
