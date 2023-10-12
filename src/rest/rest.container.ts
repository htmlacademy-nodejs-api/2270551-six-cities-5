import { Container } from 'inversify';
import { ConfigInterface } from '../shared/libs/config/config.interface.js';
import RestConfig from '../shared/libs/config/rest.config.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { DatabaseClient } from '../shared/libs/database-client/database-client.interface.js';
import MongoDatabaseClient from '../shared/libs/database-client/mongo.database-client.js';
import { LoggerInterface } from '../shared/libs/logger/logger.interface.js';
import PinoLogger from '../shared/libs/logger/pino.logger.js';
import { AppComponent } from '../shared/types/component.enum.js';
import RestApplication from './rest.application.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer
    .bind<RestApplication>(AppComponent.RestApplication)
    .to(RestApplication)
    .inSingletonScope();

  restApplicationContainer
    .bind<LoggerInterface>(AppComponent.LoggerInterface)
    .to(PinoLogger)
    .inSingletonScope();

  restApplicationContainer
    .bind<ConfigInterface<RestSchema>>(AppComponent.ConfigInterface)
    .to(RestConfig)
    .inSingletonScope();

  restApplicationContainer
    .bind<DatabaseClient>(AppComponent.DatabaseClient)
    .to(MongoDatabaseClient)
    .inSingletonScope();

  return restApplicationContainer;
}
