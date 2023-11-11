import { TCoords } from './location.type.js';
//import { CityName } from './city.enum.js';

export enum CityName {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export type TCity = {
  name: CityName;
  coords: TCoords
}

