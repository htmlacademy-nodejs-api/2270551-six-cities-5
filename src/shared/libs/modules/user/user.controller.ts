
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
import OfferRdo from '../offer/rdo/offer.rdo.js';
import { ValidateDtoMiddleware } from '../../rest/middleware/validate-dto.middleware.js';

 type BodyGetUser = {
   userId: string
 }


@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.UserServiceInterface) protected readonly userService: UserServiceInterface,
    @inject(AppComponent.ConfigInterface) protected readonly configService: ConfigInterface<RestSchema>,
  ) {
    super(logger);

    this.logger.info('Register routes for UserController...');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)]
    });
    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Post,
      handler: this.getFavorites
    });

  }

  public async create (
    { body }: Request<UnknownRecord, UnknownRecord, CreateUserDto>,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.mail);
    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.mail}» exists.`,
        'UserController | create'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res,fillDTO(UserRdo, result));
  }

  public async login(
    { body }: Request<UnknownRecord, UnknownRecord, LoginUserDto>,
    _res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.mail);

    if (!existsUser) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `User with email ${body.mail} not found.`,
        'UserController | login',
      );
    }
  }

  public async getFavorites(
    { body }: Request<UnknownRecord, UnknownRecord, BodyGetUser>,
    res: Response
  ): Promise<void> {
    const user = await this.userService.findById(body.userId);

    if (!user) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'User not found.',
        'UserController | getFavorites',
      );
    }

    const { favorites } = await user.populate('favorites');

    this.ok(res, fillDTO(OfferRdo, favorites));
  }
}
