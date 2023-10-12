import got from 'got';
import { CliCommandInterface } from './commands/command.interface.js';
import { MockServerData } from '../shared/types/mock-server-data.type.js';
import TSVOfferGenerator from '../shared/libs/offer-generator/tsv-offer-generator.js';
import TSVFileWriter from '../shared/libs/file-writer/tsv-file-writer.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockServerData;
  public async execute(...parameters:string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      this.initialData = await got.get<MockServerData>(url).json();
    } catch {
      console.warn(`Can't fetch data from ${url}.`);
      return;
    }

    const offerGeneratorString = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(offerGeneratorString.generate());
    }

    console.log(`File ${filepath} was created!`);
  }
}
