import { Coords } from './coords.type.js';

export type CityName = 'paris' | 'cologne' | 'brussels' | 'amsterdam' | 'hamburg' | 'dusseldorf';

export type City = {
  name: CityName,
  coords: Coords
}
