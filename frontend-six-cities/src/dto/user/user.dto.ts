import {UserType} from '../../const';

export default class UserDto {

  public name!: string;
  public email!: string;
  public avatarUrl!: string;
  public type!: UserType;
  public password!: string;
}
