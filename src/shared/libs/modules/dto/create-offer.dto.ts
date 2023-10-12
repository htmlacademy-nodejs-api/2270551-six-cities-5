import { City } from '../../../types/city.type.js';
import { Coords } from '../../../types/coords.type.js';
import { Feature } from '../../../types/feature.enum.js';
import { HouseType } from '../../../types/house-type.enum.js';

export default class CreateOfferDto {
  public title!: string;
  public description!: string;
  public postDate!: Date;
  public city!: City;
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
  public commentCount!: number;
  public coords!: Coords;
}
