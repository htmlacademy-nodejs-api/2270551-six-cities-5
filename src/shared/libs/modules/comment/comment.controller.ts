import { inject, injectable } from 'inversify';
import { Response } from 'express';
//import { StatusCodes } from 'http-status-codes';
import { AppComponent } from './../../../types/component.enum.js';
import { LoggerInterface } from '../../logger/logger.interface.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import { Controller } from '../../rest/controller/controller.abstract.js';
//import { HttpMethod } from './../../rest/http-method.enum.js';
import { OfferServiceInterface } from '../offer/offer-service.interface.js';
//import { UnknownRecord } from '../../../types/unknown-record.type.js';
import CreateCommentDto from '../dto/create-comment.dto.js';
//import HttpError from '../../rest/errors/http-error.js';
import { fillDTO } from '../../../helpers/common.js';
//import commentRdo from './rdo/comment.rdo.js';
import { ValidateDtoMiddleware } from '../../rest/middleware/validate-dto.middleware.js';
import {
  HttpMethod,
  PrivateRouteMiddleware,ValidateObjectIdMiddleware,
  DocumentExistsMiddleware
} from '../../../libs/rest/index.js';
import {CreateCommentRequest} from '../../../types/create-comment-request.type.js';
import CommentRdo from './rdo/comment.rdo.js';


@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.CommentServiceInterface) protected readonly commentService: CommentServiceInterface,
    @inject(AppComponent.OfferServiceInterface) protected readonly offerService: OfferServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController');

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateDtoMiddleware(CreateCommentDto)
      ]
    });
  }

  public async create(
    {body, tokenPayload}: CreateCommentRequest,
    res: Response
  ): Promise<void> {
    const comment = await this.commentService.create({...body, userId: tokenPayload.id});
    await this.offerService.incCommentCount(body.offerId);
    this.created(res, fillDTO(CommentRdo, comment));

  }
}
