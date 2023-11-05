import { Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import asyncHandler from 'express-async-handler';
import { ControllerInterface } from './controller.interface.js';
import { LoggerInterface } from '../../logger/logger.interface.js';
import { RouteInterface } from '../route.interface.js';
import { PathTransformer } from '../transform/path-transformer.js';
import { AppComponent } from '../../../types/index.js';

@injectable()
export abstract class Controller implements ControllerInterface {
  private readonly _router: Router;

  @inject(AppComponent.PathTransformer)
  private pathTranformer: PathTransformer;

  constructor(
    protected readonly logger: LoggerInterface
  ) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(route: RouteInterface) {
    const routeHandler = asyncHandler(route.handler.bind(this));
    const middlewares = route.middlewares?.map(
      (middleware) => asyncHandler(middleware.execute.bind(middleware))
    );

    const allHandlers = middlewares ? [...middlewares, routeHandler] : routeHandler;

    this._router[route.method](route.path, allHandlers);
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    const modifiedData = this.pathTranformer.execute(data as Record<string, unknown>);
    res
      .type('application/json')
      .status(statusCode)
      .json(modifiedData);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}
