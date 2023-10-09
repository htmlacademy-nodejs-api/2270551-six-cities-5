import { defaultClasses, getModelForClass, prop } from '@typegoose/typegoose';
import { User } from '../../../types/index.js';

export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ unique: true, required: true })
  public email = '';

  @prop({ required: false, default: '' })
  public avatarPath = '';

  @prop({ required: true })
  public firstname = '';

  @prop({ required: true })
  public lastname = '';
}

export const UserModel = getModelForClass(UserEntity);
