import { HouseType } from '../../../../types/house-type.enum.js';
import { Exclude, Expose, Type } from 'class-transformer';
import { Feature } from '../../../../types/feature.enum.js';
import UserRdo from '../../user/rdo/user.rdo.js';
import { City, Coords } from '../offer.entity.js';

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
  @Type(() => City)
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

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public user!: UserRdo;

  @Expose()
  public commentCount!: number;

  @Expose()
  @Type(() => Coords)
  public coords!: Coords;

  @Expose({ name: 'createdAt'})
  public postDate!: string;

}
