import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { ControllerInterface } from './../../rest/controller/controller.interface.js';
import { UserServiceInterface } from './user-service.interface.js';
import { AppComponent } from '../../../types/index.js';
import UserService from './default-user.service.js';
import { UserEntity, UserModel } from './user.entity.js';
import UserController from './user.controller.js';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<UserServiceInterface>(AppComponent.UserServiceInterface).to(UserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(AppComponent.UserModel).toConstantValue(UserModel);
  userContainer.bind<ControllerInterface>(AppComponent.UserController).to(UserController).inSingletonScope();

  return userContainer;
}
