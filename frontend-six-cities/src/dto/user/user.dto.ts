import {UserType} from '../../const';

export class UserDto {

  public name!: string;
  public email!: string;
  public avatarUrl!: string;
  public type!: UserType;
}
