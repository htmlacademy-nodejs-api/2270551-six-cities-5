import { inject, injectable } from 'inversify';
import { OfferEntity } from './offer.entity.js';
import { LoggerInterface } from '../../logger/logger.interface.js';
import { AppComponent } from '../../../types/component.enum.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { DEFAULT_OFFER_COUNT, PREMIUM_OFFER_BY_CITY_LIMIT } from './offer.constant.js';
import CreateOfferDto from '../dto/create-offer.dto.js';
import UpdateOfferDto from '../dto/update-offer.dto.js';
import { SortType } from '../../../types/sort-type.enum.js';
import { CityName } from '../../../types/city.type.js';

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto) {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({}, {}, { limit: DEFAULT_OFFER_COUNT })
      .sort({createdAt: SortType.Down})
      .populate('userId')
      .exec();
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate('userId')
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    const offerDoc = await this.offerModel.findById(offerId);

    if(offerDoc === null) {
      return null;
    }

    if(dto.rating) {
      const currentRating = offerDoc.rating;
      const currentRatingCount = offerDoc.ratingCount;
      const newRatingCount = currentRatingCount + 1;

      dto.rating =
        (currentRating * currentRatingCount + dto.rating) / newRatingCount;

      offerDoc.ratingCount = newRatingCount;
    }

    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate('userId')
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity, types.BeAnObject> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async findPremiumByCity(cityName: CityName): Promise<DocumentType<OfferEntity, types.BeAnObject>[]> {
    return this.offerModel
      .find({ city: { cityName }, premium: true }, {}, { limit: PREMIUM_OFFER_BY_CITY_LIMIT })
      .sort({createdAt: SortType.Down})
      .populate('userId')
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity, types.BeAnObject> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, { $inc: { commentCount: 1 } })
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }
}

