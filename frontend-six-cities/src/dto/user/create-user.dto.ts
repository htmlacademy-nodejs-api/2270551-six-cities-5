import { UserType } from '../../../../src/shared/types/user-type.enum.js';


export default class CreateUserDto {

  public name!: string;


  public mail!: string;


  public password!: string;


  public type!: UserType;
}

