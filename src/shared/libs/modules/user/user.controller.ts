
import { Request, Response } from 'express';
import { RestSchema } from './../../config/rest.schema.js';
import { ConfigInterface } from './../../config/config.interface.js';
import { UserServiceInterface } from './user-service.interface.js';
import { HttpMethod } from './../../rest/http-method.enum.js';
import { AppComponent } from './../../../types/component.enum.js';
import { inject, injectable } from 'inversify';
import { Controller } from '../../rest/controller/controller.abstract.js';
import { LoggerInterface } from '../../logger/logger.interface.js';
import { fillDTO } from '../../../helpers/common.js';
import UserRdo from './rdo/user.rdo.js';
import { UnknownRecord } from '../../../types/unknown-record.type.js';
import CreateUserDto from '../dto/create-user.dto.js';
import LoginUserDto from '../dto/login-user.dto.js';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../../rest/errors/http-error.js';


@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.UserServiceInterface) protected readonly userService: UserServiceInterface,
    @inject(AppComponent.ConfigInterface) protected readonly configService: ConfigInterface<RestSchema>,
  ) {
    super(logger);

    this.logger.info('Register routes for UserController...');

    this.addRoute({path: '/register', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/login', method: HttpMethod.Post, handler: this.login });

  }

  public async create (
    {body}: Request<UnknownRecord, UnknownRecord, CreateUserDto>,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.mail);
    if (existsUser) {
      const existCategoryError = new Error(`Category with name «${body.mail}» exists.`);
      this.send(res,
        StatusCodes.UNPROCESSABLE_ENTITY,
        { error: existCategoryError.message }
      );

      return this.logger.error(existCategoryError.message, existCategoryError);
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res,fillDTO(UserRdo, result));
  }

  public async login(
    {body}: Request<UnknownRecord, UnknownRecord, LoginUserDto>,
    _res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.mail);

    if (!existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.mail} not found.`,
        'UserController',
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );

  }
}
