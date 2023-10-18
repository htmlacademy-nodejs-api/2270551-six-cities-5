
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

  public async index(_req: Request, res: Response): Promise<void> {
    const categories = await this.userService.findByEmail(mail);
    const responseData = fillDTO(UserRdo, categories);
    this.ok(res, responseData);
  }


  public create(_req: Request, _res: Response): void {
    // Код обработчика
  }

}

