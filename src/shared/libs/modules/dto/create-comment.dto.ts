import { Max, Min } from 'class-validator';
import { IsInt, IsString, Length } from 'class-validator';
import { MAX_COMMENT_RATING, MIN_COMMENT_RATING } from '../comment/comment.constant.js';
import { IsMongoId } from 'class-validator';

export default class CreateCommentDto {
  @IsString({ message: 'text is required' })
  @Length(5, 1024, { message: 'Min length is 5, max is 1024' })
  public text!: string;

  @IsInt({ message: 'Rating must be an integer' })
  @Min(MIN_COMMENT_RATING, { message: `Min rating is ${MIN_COMMENT_RATING}` })
  @Max(MAX_COMMENT_RATING, { message: `Max rating is ${MAX_COMMENT_RATING}` })
  public rating!: number;

  @IsMongoId({ message: 'User id is not valid' })
  public userId!: string;

  @IsMongoId({ message: 'Offer id is not valid' })
  public offerId!: string;
}
