import { inject, injectable } from 'inversify';
import { ConfigInterface, RestSchema } from '../shared/libs/config/index.js';
import { LoggerInterface } from '../shared/libs/logger/index.js';
import { AppComponent } from '../shared/types/index.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoURI } from '../shared/helpers/index.js';
import express, { Express } from 'express';
import { ControllerInterface } from './../shared/libs/rest/controller/controller.interface.js';

@injectable()
export default class RestApplication {
  private expressApp: Express;

  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.ConfigInterface) private readonly config: ConfigInterface<RestSchema>,
    @inject(AppComponent.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(AppComponent.UserController) private readonly userController: ControllerInterface,
    @inject(AppComponent.OfferController) private readonly offerController: ControllerInterface,
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
    this.logger.info('Global middleware initialization…');

    this.expressApp.use(express.json());

    this.logger.info('Global middleware initialization completed');
  }

  private async _initServer() {
    this.logger.info('Try to init server...');

    const port = this.config.get('PORT');
    this.expressApp.listen(port);

    //this.logger.info(`🚀Server started on http://localhost:${this.config.get('PORT')}`);
  }

  private async _initRoutes() {
    this.logger.info('Controller initialization...');

    this.expressApp.use('/offers', this.offerController.router);
    this.expressApp.use('/users', this.userController.router);

    this.logger.info('Controller initialization complete');
  }

  public async init() {
    this.logger.info('Application initialization');
    //this.logger.warn('Application initialization');
    //this.logger.error('ehm', new Error('Some error'));
    //this.logger.debug('This is debug');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init app-level middleware');
    await this._initMiddleware();
    this.logger.info('App-level middleware initialization completed');

    this.logger.info('Init database…');
    await this._initDb();
    this.logger.info('Init database completed');

    this.logger.info('Init routes…');
    await this._initRoutes();
    this.logger.info('Routers initialization completed');


    this.logger.info('Try to init server…');
    await this._initServer();
    this.logger.info(`🚀 Server started on http://localhost:${this.config.get('PORT')}`);
  }
}
