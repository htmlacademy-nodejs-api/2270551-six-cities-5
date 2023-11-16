import { Location } from './types';


export type PreviewOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};
