import { config } from 'dotenv';
import { inject, injectable } from 'inversify';
import { ConfigInterface } from './config.interface.js';
import { LoggerInterface } from '../logger/index.js';
import { configRestSchema, RestSchema } from './rest.schema.js';
import { AppComponent } from '../../types/index.js';


@injectable()
export default class RestConfig implements ConfigInterface<RestSchema> {
  private readonly config: RestSchema;

  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    configRestSchema.load({});
    configRestSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configRestSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
