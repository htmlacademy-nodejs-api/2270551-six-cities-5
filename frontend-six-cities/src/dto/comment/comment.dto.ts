import {UserDto} from '../user';

export class CommentDto {
  public userId!: string;
  public description!: string;
  public rating!: number;
  public author!: UserDto;
  public offerId!: string;
  public postDate!: string;
}
