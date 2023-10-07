import { inject, injectable } from 'inversify';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { LoggerInterface } from '../shared/libs/logger/index.js';
import { Component } from '../shared/types/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: LoggerInterface,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {}

  public async init() {
    this.logger.info('Application initialization');
    this.logger.warn('Application initialization');
    this.logger.error('ehm', new Error('Some error'));
    this.logger.debug('This is debug');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
