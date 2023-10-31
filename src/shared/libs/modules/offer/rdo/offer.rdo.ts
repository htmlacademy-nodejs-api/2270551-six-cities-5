import { HouseType } from '../../../../types/house-type.enum.js';
import { Exclude, Expose } from 'class-transformer';
import { City } from '../../../../types/city.type.js';
import { Feature } from '../../../../types/feature.enum.js';
import { User } from '../../../../types/user.type.js';
import { Coords } from '../../../../types/coords.type.js';

export default class OfferRdo {
  @Exclude()
  public __v!: string;

  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public city!: City;

  @Expose()
  public preview!: string;

  @Expose()
  public photos!: string[];

  @Expose()
  public premium!: boolean;

  @Expose()
  public favorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public houseType!: HouseType;

  @Expose()
  public roomNumber!: number;

  @Expose()
  public guests!: number;

  @Expose()
  public price!: number;

  @Expose()
  public features!: Feature;

  @Expose()
  public userId!: User;

  @Expose()
  public commentCount!: number;

  @Expose()
  public coords!: Coords;

  @Expose({ name: 'createdAt'})
  public postDate!: string;

}
