import {Container} from 'inversify';

import ExceptionFilter from '../../../libs/rest/exception-filters/exception-filter.js';
import {AppComponent} from './../../../../shared/types/component.enum.js';
import {AuthExceptionFilter} from './auth-exception-filter.js';
import {AuthService} from './auth-service.interface.js';
import {DefaultAuthService} from './default-auth.service.js';

export function createAuthContainer() {
  const authContainer = new Container();

  authContainer.bind<AuthService>(AppComponent.AuthService).to(DefaultAuthService).inSingletonScope();
  authContainer.bind<ExceptionFilter>(AppComponent.AuthExceptionFilter).to(AuthExceptionFilter).inSingletonScope();

  return authContainer;
}
