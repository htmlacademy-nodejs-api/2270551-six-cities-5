import { inject, injectable } from 'inversify';
import { ConfigInterface, RestSchema } from '../shared/libs/config/index.js';
import { LoggerInterface } from '../shared/libs/logger/index.js';
import { AppComponent } from '../shared/types/index.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoURI } from '../shared/helpers/index.js';
import express, { Express } from 'express';
import { ControllerInterface } from './../shared/libs/rest/controller/controller.interface.js';
import { ExceptionFilterInterface } from './../shared/libs/rest/exception-filters/exception-filter.interface.js';
import { ParseTokenMiddleware } from '../shared/libs/rest/middleware/parse-token.middleware.js';
import { getFullServerPath } from '../common.js';
import { STATIC_FILES_ROUTE, STATIC_UPLOAD_ROUTE } from './rest.constant.js';
import cors from 'cors';

@injectable()
export default class RestApplication {
  private expressApp: Express;


  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.ConfigInterface) private readonly config: ConfigInterface<RestSchema>,
    @inject(AppComponent.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(AppComponent.UserController) private readonly userController: ControllerInterface,
    @inject(AppComponent.OfferController) private readonly offerController: ControllerInterface,
    @inject(AppComponent.ExceptionFilterInterface) private readonly exceptionFilter: ExceptionFilterInterface,
    @inject(AppComponent.CommentController) private readonly commentController: ControllerInterface,
    @inject(AppComponent.AuthExceptionFilter) private readonly authExceptionFilter: ExceptionFilterInterface,
    @inject(AppComponent.HttpExceptionFilter) private readonly httpExceptionFilter: ExceptionFilterInterface,
    @inject(AppComponent.ValidationExceptionFilter) private readonly validationExceptionFilter: ExceptionFilterInterface,
  ) {
    this.expressApp = express();
  }

  private async _initDb() {
    this.logger.info('init DB');
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    this.databaseClient.connect(mongoUri);
    this.logger.info('init DB complete');
  }

  private async _initMiddleware() {
    const authenticateMiddleware = new ParseTokenMiddleware(this.config.get('JWT_SECRET'));

    this.logger.info('Global middleware initialization…');

    this.expressApp.use(express.json());
    this.expressApp.use(
      STATIC_UPLOAD_ROUTE,
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );
    this.expressApp.use(
      STATIC_FILES_ROUTE,
      express.static(this.config.get('STATIC_DIRECTORY_PATH'))
    );

    this.expressApp.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
    this.expressApp.use(cors());

    this.logger.info('Global middleware initialization completed');
  }

  private async _initServer() {
    this.logger.info('Try to init server...');

    const port = this.config.get('PORT');
    this.expressApp.listen(port);

    //this.logger.info(`🚀Server started on http://localhost:${this.config.get('PORT')}`);
  }

  private async _initExceptionFilters() {
    this.expressApp.use(this.authExceptionFilter.catch.bind(this.authExceptionFilter));
    this.expressApp.use(this.validationExceptionFilter.catch.bind(this.validationExceptionFilter));
    this.expressApp.use(this.httpExceptionFilter.catch.bind(this.httpExceptionFilter));
    this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    this.logger.info('Exception filters initialization');

    this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));

    this.logger.info('Exception filters completed');

  }


  private async _initRoutes() {
    this.logger.info('Controller initialization...');
    this.expressApp.use('/offers', this.offerController.router);
    this.expressApp.use('/users', this.userController.router);
    this.expressApp.use('/comments', this.commentController.router);

    this.logger.info('Controller initialization complete');
  }

  public async init(): Promise<void> {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init app-level middleware');
    await this._initMiddleware();
    this.logger.info('App-level middleware initialization completed');

    this.logger.info('Init exception filters');
    await this._initExceptionFilters();
    this.logger.info('Exception filters initialization compleated');

    this.logger.info('Init database…');
    await this._initDb();
    this.logger.info('Init database completed');

    this.logger.info('Init routes…');
    await this._initRoutes();
    this.logger.info('Routers initialization completed');

    this.logger.info('Try to init server…');
    await this._initServer();
    this.logger.info(`🚀 Server started on ${getFullServerPath(this.config.get('HOST'),
      this.config.get('PORT'))}`);
  }
}
