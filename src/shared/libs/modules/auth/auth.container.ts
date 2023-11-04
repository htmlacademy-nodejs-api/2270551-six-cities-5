import {Container} from 'inversify';

import {ExceptionFilterInterface} from '../../../libs/rest/index.js';
import {AppComponent} from '../../../types/index.js';
import {AuthExceptionFilter} from './auth-exception-filter.js';
import {AuthService} from './auth-service.interface.js';
import {DefaultAuthService} from './default-auth.service.js';

export function createAuthContainer() {
  const authContainer = new Container();

  authContainer.bind<AuthService>(AppComponent.AuthService).to(DefaultAuthService).inSingletonScope();
  authContainer.bind<ExceptionFilterInterface>(AppComponent.AuthExceptionFilter).to(AuthExceptionFilter).inSingletonScope();

  return authContainer;
}
