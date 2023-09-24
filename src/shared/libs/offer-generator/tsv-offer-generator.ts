import dayjs from 'dayjs';
import { OfferGeneratorInterface } from './offer-generator.interface.js';
import { MockServerData } from '../../types/mock-server-data.type.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';

const MIN_PRICE = 0;
const MAX_PRICE = 200000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_ROOMS_COUNT = 1;
const MAX_ROOMS_COUNT = 10;

const MIN_GUESTS = 0;
const MAX_GUESTS = 9999;

const MIN_COMMENTS_COUNT = 1;
const MAX_COMMENTS_COUNT = 10;

export class TSVOfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    //const createdDate = getRandomItem<string>(this.mockData.createdDates);
    const city = getRandomItem<string>(this.mockData.citys);
    const preview = getRandomItem<string>(this.mockData.previews);
    const photos = getRandomItems<string>(this.mockData.photos).join(';');
    const premium = Boolean(Math.random() < 0.5);
    const favorite = Boolean(Math.random() < 0.5);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1).toString();
    const houseType = getRandomItem<string>(this.mockData.houseTypes);
    const roomNumber = generateRandomValue(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT).toString();
    const guests = generateRandomValue(MIN_GUESTS, MAX_GUESTS).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const features = getRandomItems<string>(this.mockData.features).join(';');
    const author = getRandomItem<string>(this.mockData.authors);
    const coments = generateRandomValue(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT).toString();
    const coords = getRandomItem<string>(this.mockData.coords);

    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();


    return [
      title, description, createdDate, city, preview, photos, premium, favorite, rating, houseType, roomNumber, guests, price, features, author, coments, coords
    ].join('\t');
  }
}

