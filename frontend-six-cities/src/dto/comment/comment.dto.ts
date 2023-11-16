import UserDto from '../user/user.dto';

export class CommentDto {
  public userId!: string;
  public description!: string;
  public rating!: number;
  public author!: UserDto;
  public offerId!: string;
  public postDate!: string;
}
