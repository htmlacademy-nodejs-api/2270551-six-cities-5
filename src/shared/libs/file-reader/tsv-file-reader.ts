import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer } from '../../types/index.js';
import { Feature } from '../../types/feature.enum.js';
import { HouseType } from '../../types/house-type.enum.js';
import { City } from '../../types/city.type.js';


export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
     private readonly filename: string
  ) {}

  //читаем данные сейчас из моков
  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  // проверяем прочитаны ли данные из файла и разбираем полученную строку
  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([title, description, createdDate, city, preview, photos, premium, favorite, rating, houseType, roomNumber, guests, price, features, author, coments, coords]) => ({
        title,
        description,
        postDate: new Date(createdDate),
        city: (city as City),
        preview,
        photos: photos.split(';'),
        premium: Boolean(premium),
        favorite: Boolean(favorite),
        rating: Number.parseFloat(rating),
        houseType: (houseType as HouseType),
        roomNumber: Number.parseInt(roomNumber, 10),
        guests: Number.parseInt(guests, 10),
        price: Number.parseInt(price, 10),
        author,
        features: (features.split(';') as Feature[]),
        coments: Number.parseInt(coments, 10),
        coords: {
          longitude: Number.parseFloat(coords.split(';')[0]),
          latitude: Number.parseFloat(coords.split(';')[1])
        }
      }));
  }
}
