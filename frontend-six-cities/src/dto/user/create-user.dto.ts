import {UserType} from '../../const';

export default class CreateUserDto {

  public name!: string;
  public mail!: string;
  public password!: string;
  public type!: UserType;
}

