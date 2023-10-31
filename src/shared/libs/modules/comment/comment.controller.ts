import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppComponent } from './../../../types/component.enum.js';
import { LoggerInterface } from '../../logger/logger.interface.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import { Controller } from '../../rest/controller/controller.abstract.js';
import { HttpMethod } from './../../rest/http-method.enum.js';
import { OfferServiceInterface } from '../offer/offer-service.interface.js';
import { UnknownRecord } from '../../../types/unknown-record.type.js';
import CreateCommentDto from '../dto/create-comment.dto.js';
import HttpError from '../../rest/errors/http-error.js';
import { fillDTO } from '../../../helpers/common.js';
import commentRdo from './rdo/comment.rdo.js';
//import { ValidateDtoMiddleware } from '../../middleware/validate-dto.middleware.js';


@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.CommentServiceInterface) protected readonly commentService: CommentServiceInterface,
    @inject(AppComponent.OfferServiceInterface) protected readonly offerService: OfferServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');
    this.addRoute({ path: '/:offerId', method: HttpMethod.Post, handler: this.create });
    //middlewares: [new ValidateDtoMiddleware(CreateCommentDto)]

  }

  public async create(
    { body }: Request<UnknownRecord, UnknownRecord, CreateCommentDto>,
    res: Response
  ): Promise<void> {
    if(!await this.offerService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController | create'
      );
    }

    const newComment = await this.commentService.create(body);
    await this.offerService.incCommentCount(body.offerId);

    this.created(res, fillDTO(commentRdo, newComment));
  }
}
