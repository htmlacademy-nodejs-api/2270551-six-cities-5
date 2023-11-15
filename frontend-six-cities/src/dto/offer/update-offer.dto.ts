import { CityName } from '../../../../src/shared/types/city.type.js';
import { Coords } from '../../../../src/shared/types/coords.type.js';
import { Feature } from '../../../../src/shared/types/feature.enum.js';
import { HouseType } from '../../../../src/shared/types/house-type.enum.js';


export default class UpdateOfferDto {


  public title?: string;
  public description?: string;
  public postDate?: Date;
  public city?: CityName;
  public preview?: string;
  public photos?: string[];
  public premium?: boolean;
  public favorite?: boolean;
  public rating?: number;
  public image?: string;
  public houseType?: HouseType;
  public roomNumber?: number;
  public guests?: number;
  public price?: number;
  public features?: Feature[];
  public id?: string;
  public coords?: Coords;
}
