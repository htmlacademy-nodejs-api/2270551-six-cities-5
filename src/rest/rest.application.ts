import { LoggerInterface } from '../shared/libs/logger/index.js';

export class RestApplication {
  constructor(
     private readonly logger: LoggerInterface
  ) {}

  public async init() {
    this.logger.info('Application initialization');
  }
}