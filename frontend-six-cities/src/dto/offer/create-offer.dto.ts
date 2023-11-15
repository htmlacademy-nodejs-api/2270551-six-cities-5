import { Coords,CityName,HouseType, Feature } from '../../types';

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
