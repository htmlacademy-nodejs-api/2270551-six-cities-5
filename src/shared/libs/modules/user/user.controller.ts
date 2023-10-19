
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
    //this.addRoute({ path: '/login', method: HttpMethod.Post, handler: this.login });
  }

  public async create (
    {body}: Request<UnknownRecord, UnknownRecord, CreateUserDto>,
    res: Response,
  ): Promise<void> {
    //const existsUser = await this.userService.findByEmail(body.mail);


    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(
      res,
      fillDTO(UserRdo, result)
    );
  }

  public logcreate(_req: Request, _res: Response): void {
    // Код обработчика
  }

}

