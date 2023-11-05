
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
import { UploadFileMiddleware } from '../../rest/middleware/upload-file.middleware.js';
import { ValidateObjectIdMiddleware } from '../../rest/index.js';
import {LoggedUserRdo} from './rdo/logged-user.rdo.js';
import {AuthService} from '../auth/index.js';
import { LoginUserRequest } from './login-user-request.type.js';

type BodyGetUser = {
  userId: string
}

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.UserServiceInterface) protected readonly userService: UserServiceInterface,
    @inject(AppComponent.ConfigInterface) protected readonly configService: ConfigInterface<RestSchema>,
    @inject(AppComponent.AuthService) protected readonly authService: AuthService,
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
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuthenticate,
    });
  }

  public async create(
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
    this.created(
      res,
      fillDTO(UserRdo, result)
    );
  }

  public async login(
    {body}: LoginUserRequest,
    res: Response
  ) {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRdo, user);
    this.ok(res, Object.assign(responseData, { token }));
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

  public async uploadAvatar(req: Request, res: Response) {
    this.created(res, {
      filePath: req.file?.path
    });
  }

  public async checkAuthenticate({ tokenPayload: { email }}: Request, res: Response) {
    const foundedUser = await this.userService.findByEmail(email);

    if (! foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(LoggedUserRdo, foundedUser));
  }
}
