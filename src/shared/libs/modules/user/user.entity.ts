import { User } from '../../../types/index.js';

export class UserEntity implements User {
  public email = '';
  public avatarPath = '';
  public firstname = '';
  public lastname = '';
}
