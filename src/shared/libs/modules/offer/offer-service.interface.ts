import { CityName } from '../../../types/city.type.js';
import { OfferEntity } from './offer.entity.js';
import { DocumentType } from '@typegoose/typegoose';
import CreateOfferDto from '../dto/create-offer.dto.js';
import UpdateOfferDto from '../dto/update-offer.dto.js';
import {DocumentExists} from '../../../types/document-exists.interface.js';

export interface OfferServiceInterface extends DocumentExists{
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(id: string): Promise<DocumentType<OfferEntity> | null>;
  find(): Promise<DocumentType<OfferEntity>[]>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findPremiumByCityName(cityName: CityName): Promise<DocumentType<OfferEntity>[]>
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}

