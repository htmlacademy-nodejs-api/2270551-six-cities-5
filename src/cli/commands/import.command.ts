import { DatabaseClient } from '../../shared/libs/database-client/database-client.interface.js';
import { OfferServiceInterface } from '../../shared/libs/modules/Offer/offer-service.interface.js';
import { UserServiceInterface } from '../../shared/libs/modules/user/user-service.interface.js';
import TSVFileReader from '../../shared/libs/file-reader/tsv-file-reader.js';
import { CliCommandInterface } from './command.interface.js';
import { createOffer, getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { LoggerInterface } from '../../shared/libs/logger/logger.interface.js';
import ConsoleLogger from '../../shared/libs/logger/console.logger.js';
import UserService from '../../shared/libs/modules/user/default-user.service.js';
import { UserModel } from '../../shared/libs/modules/user/user.entity.js';
import OfferService from '../../shared/libs/modules/Offer/default-offer.service.js';
import { OfferModel } from '../../shared/libs/modules/Offer/offer.entity.js';
import MongoClientService from '../../shared/libs/database-client/mongo.database-client.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from '../../const.js';
import { Offer } from '../../shared/types/offer.type.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private offerService!: OfferServiceInterface;
  private databaseService!: DatabaseClient;
  private logger: LoggerInterface;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLogger();
    this.userService = new UserService(this.logger, UserModel);
    this.offerService = new OfferService(this.logger, OfferModel);
    this.databaseService = new MongoClientService(this.logger);
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.author,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      ...offer,
      userId: user.id,
    });
  }

  private async onLine(line: string, resolve: () => void) {
    const offer = createOffer(line);

    await this.saveOffer(offer);
    resolve();
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch(err) {
      console.log(`Can't read the file: ${getErrorMessage(err)}`);
    }
  }
}
