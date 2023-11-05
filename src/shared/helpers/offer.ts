import { Offer } from '../types/offer.type.js';
import { User } from '../types/user.type.js';
import { CityName } from '../types/city.type.js';
import { HouseType } from '../types/house-type.enum.js';
import { Feature } from '../types/feature.enum.js';
import { UserType } from '../types/user-type.enum.js';
import { CITIES } from '../../const.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    createdDate,
    city,
    preview,
    photos,
    premium,
    favorite,
    rating,
    houseType,
    roomNumber,
    guests,
    price,
    features,
    avatarUrl,
    userName,
    mail,
    userType,
    commentCount,
    coords
  ] = offerData.replace('\n', '').split('\t');


  const author: User = {
    name: userName,
    mail,
    avatarUrl,
    type: (userType as UserType)
  };

  const cityData = CITIES[(city.toLocaleLowerCase() as CityName)];
  console.log(cityData);

  return {
    title,
    description,
    postDate: new Date(createdDate),
    city: cityData,
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
    commentCount: Number.parseInt(commentCount, 10),
    coords: {
      latitude: Number.parseFloat(coords.split(';')[0]),
      longitude: Number.parseFloat(coords.split(';')[1])
    }
  } as Offer;
}
