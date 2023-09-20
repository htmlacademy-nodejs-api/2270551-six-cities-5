import { Coords } from './coords.type.js';
import { HouseType } from './house-type.enum.js';
import { Feature } from './feature.enum.js';
import { City } from './city.type.js';
//import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  preview: string;
  photos: string[];
  premium: boolean;
  favorite: boolean;
  rating: number;
  houseType: HouseType;
  roomNumber: number;
  guests: number;
  price: number;
  features: Feature[];
  author: string;
  coments: number;
  coords: Coords;
};
