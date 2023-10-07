import { Config } from '../shared/libs/config/config.interface.js';
import { LoggerInterface } from '../shared/libs/logger/index.js';

export class RestApplication {
  constructor(
     private readonly logger: LoggerInterface,
     private readonly config: Config,
  ) {}

  public async init() {
    this.logger.info('Application initialization');
    this.logger.warn('Application initialization');
    this.logger.error('ehm', new Error('Some error'));
    this.logger.debug('This is debug');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
