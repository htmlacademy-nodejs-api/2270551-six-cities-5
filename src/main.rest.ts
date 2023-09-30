import { PinoLogger } from './shared/libs/logger/index.js';
import { RestApplication } from './cli/rest/index.js';

async function bootstrap() {
  const logger = new PinoLogger();

  const application = new RestApplication(logger);
  await application.init();
}

bootstrap();
