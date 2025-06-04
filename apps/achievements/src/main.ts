import { AppBuilder } from '@app/core';
import { AchievementsModule } from './app/achievements.module';

AppBuilder.create(AchievementsModule)
  .setupSwagger({
    title: 'Achievements API',
    version: '1.0',
    path: 'api/docs',
  })
  .enableValidation()
  .launch();
