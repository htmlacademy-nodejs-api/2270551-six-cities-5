import { Offer } from '../types/offer.type.js';
import { City } from '../types/city.type.js';
import { HouseType } from '../types/house-type.enum.js';
import { Feature } from '../types/feature.enum.js';

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
    author,
    coments,
    coords
  ] = offerData.replace('\n', '').split('\t');

  return {
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
  } as Offer;
}
