import { CityName } from '../../../../src/shared/types/city.type.js';
import { Feature } from '../../../../src/shared/types/feature.enum.js';
import { HouseType } from '../../../../src/shared/types/house-type.enum.js';
import { Coords } from '../../../../src/shared/libs/modules/offer/offer.entity.js';


export default class CreateOfferDto {

  public title!: string;


  public description!: string;


  public postDate!: Date;


  public city?: CityName;


  public preview!: string;


  public photos!: string[];


  public premium!: boolean;


  public favorite!: boolean;


  public rating!: number;


  public houseType!: HouseType;


  public roomNumber!: number;


  public guests!: number;


  public price!: number;


  public features!: Feature[];

  public userId!: string;


  public coords!: Coords;

}
