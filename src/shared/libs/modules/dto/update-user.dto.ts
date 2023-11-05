import { UserType } from './../../../types/user-type.enum.js';

export default class UpdateUserDto {
  public name?: string;
  public mail?: string;
  public avatarUrl?: string;
  public password?: string;
  public type?: UserType;
  public favorites?: string[];
}
