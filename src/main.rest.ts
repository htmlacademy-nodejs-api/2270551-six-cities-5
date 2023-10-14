import 'reflect-metadata';
import { Container } from 'inversify';
import RestApplication from './rest/rest.application.js';
import { AppComponent } from './shared/types/index.js';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { createUserContainer } from './shared/libs/modules/user/index.js';
import { createOfferContainer } from './shared/libs/modules/Offer/index.js';


async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
  );

  const application = appContainer.get<RestApplication>(AppComponent.RestApplication);
  await application.init();
}

bootstrap();
