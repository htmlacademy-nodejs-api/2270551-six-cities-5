import EventEmitter from 'node:events';
import { FileReader } from './file-reader.interface.js';
import { createReadStream } from 'node:fs';
//import { readFileSync } from 'node:fs';
//import { Offer } from '../../types/index.js';
//import { Feature } from '../../types/feature.enum.js';
//import { HouseType } from '../../types/house-type.enum.js';
//import { City } from '../../types/city.type.js';

const CHUNK_SIZE = 16384; // 16KB размер чанка

export default class TSVFileReader extends EventEmitter implements FileReader {
  constructor(public filename: string) {
    super();
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        this.emit('line', completeRow);
      }
    }

    this.emit('end', importedRowCount);
  }
}
