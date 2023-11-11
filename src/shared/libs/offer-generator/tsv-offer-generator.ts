import dayjs from 'dayjs';
import { OfferGeneratorInterface } from './offer-generator.interface.js';
import { MockServerData } from '../../types/mock-server-data.type.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { PlaceRentPrices, WeekDays, OfferRatings, PlaceRoomsCount,PlaceGuestsAmount,CommentCount } from './og.const.js';

export default class TSVOfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem<string>(this.mockData.citys);
    const preview = getRandomItem<string>(this.mockData.previews);
    const photos = getRandomItems<string>(this.mockData.photos).join(';');
    const premium = Boolean(Math.random() < 0.5);
    const favorite = Boolean(Math.random() < 0.5);
    const rating = generateRandomValue(OfferRatings.MIN, OfferRatings.MAX, 1).toString();
    const houseType = getRandomItem<string>(this.mockData.houseTypes);
    const roomNumber = generateRandomValue(PlaceRoomsCount.MIN, PlaceRoomsCount.MAX).toString();
    const guests = generateRandomValue(PlaceGuestsAmount.MIN, PlaceGuestsAmount.MAX).toString();
    const price = generateRandomValue(PlaceRentPrices.MIN, PlaceRentPrices.MAX).toString();
    const features = getRandomItems<string>(this.mockData.features).join(';');
    const author = getRandomItem<string>(this.mockData.authors);
    const coments = generateRandomValue(CommentCount.MIN, CommentCount.MAX).toString();
    const coords = getRandomItem<string>(this.mockData.coords);

    const createdDate = dayjs()
      .subtract(generateRandomValue(WeekDays.FIRST_DAY, WeekDays.LAST_DAY), 'day')
      .toISOString();


    return [
      title, description, createdDate, city, preview, photos, premium, favorite, rating, houseType, roomNumber, guests, price, features, author, coments, coords
    ].join('\t');
  }
}

