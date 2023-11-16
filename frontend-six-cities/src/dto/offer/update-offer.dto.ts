import { Coords,CityName,HouseType, Feature } from '../../types';

export default class UpdateOfferDto {


  public title?: string;
  public description?: string;
  public postDate?: Date;
  public city?: CityName;
  public preview?: string;
  public photos?: string[];
  public premium?: boolean;
  public favorite?: boolean;
  public type?: HouseType;
  public roomNumber?: number;
  public guests?: number;
  public price?: number;
  public features?: Feature[];
  public coords?: Coords;
  public rating?: number;
  public image?: string;
}
