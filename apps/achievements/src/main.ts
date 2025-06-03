import { AppBuilder } from '@app/core';
import { AppModule } from './app/app.module';

AppBuilder.create(AppModule)
  .setupSwagger({
    title: 'Achievements API',
    version: '1.0',
    path: 'api/docs',
  })
  .enableValidation()
  .launch();
