import typegoose, { getModelForClass, defaultClasses, Ref } from '@typegoose/typegoose';
import { HouseType } from '../../../types/house-type.enum.js';
import { City as TCity, CityName } from '../../../types/city.type.js';
import { Coords as TCoords } from '../../../types/coords.type.js';
import { Feature } from '../../../types/feature.enum.js';
import {
  MAX_OFFER_DESCRIPTION_LENGTH,
  MAX_OFFER_TITLE_LENGTH,
  MIN_OFFER_DESCRIPTION_LENGTH,
  MIN_OFFER_TITLE_LENGTH,
  OFFER_PHOTOS_QUANTITY
} from '../../../../const.js';
import { UserEntity } from '../user/user.entity.js';

const { prop, modelOptions } = typegoose;

class Coords implements TCoords {
  @prop({
    required: true
  })
    latitude!: number;

  @prop({
    required: true
  })
    longitude!: number;
}

class City implements TCity {
  @prop({
    required: true
  })
  public name!: CityName;

  @prop({
    type: Coords
  })
  public coords!: Coords;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    trim: true,
    minlength: [MIN_OFFER_TITLE_LENGTH, `Min length for title is ${ MIN_OFFER_TITLE_LENGTH}`],
    maxlength: [MAX_OFFER_TITLE_LENGTH, `Max length for title is ${ MAX_OFFER_TITLE_LENGTH}`]
  })
  public title!: string;

  @prop({
    required: true,
    trim: true,
    minlength: [MIN_OFFER_DESCRIPTION_LENGTH, `Min length for description is ${ MIN_OFFER_DESCRIPTION_LENGTH}`],
    maxlength: [MAX_OFFER_DESCRIPTION_LENGTH, `Max length for description is ${ MAX_OFFER_DESCRIPTION_LENGTH}`]
  })
  public description!: string;

  @prop({
    required: true
  })
  public postDate!: Date;

  @prop({
    required: true
  })
  public city!: City;

  @prop({
    required: true
  })
  public preview!: string;

  @prop({
    type: [String],
    required: true,
    validate: {
      validator: (photos: Array<string>) => photos.length === OFFER_PHOTOS_QUANTITY,
      message: `photos quantity must be equal ${OFFER_PHOTOS_QUANTITY}!`
    }
  })
  public photos!: string[];

  @prop({
    required: true
  })
  public premium!: boolean;

  @prop({
    required: true
  })
  public favorite!: boolean;

  @prop({
    required: true,
  })
  public rating!: number;

  @prop({
    required: true,
    enum: HouseType
  })
  public houseType!: HouseType;

  @prop({
    required: true,
  })
  public roomNumber!: number;

  @prop({
    required: true,
  })
  public guests!: number;

  @prop(
    {
      required: true,
    }
  )
  public price!: number;

  @prop({
    type: () => String,
    enum: Feature,
    required: true,
  })
  public features!: Feature[];

  @prop({
    required: true,
    ref: UserEntity,
  })
  public userId!: Ref<UserEntity>;

  @prop({ default: 0 })
  public commentCount!: number;

  @prop({
    required: true,
  })
  public coords!: Coords;
}


export const OfferModel = getModelForClass(OfferEntity);
