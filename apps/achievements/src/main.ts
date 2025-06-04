import { AppBuilder } from '@app/core';
import * as path from 'path';
import { AchievementsModule } from './app/achievements.module';

// For production, assets are in dist/apps/achievements/assets
// For development, assets are in apps/achievements/src/assets
const assetsPath =
  process.env.NODE_ENV === 'production'
    ? path.join(__dirname, 'assets')
    : './apps/achievements/src/assets';

AppBuilder.create(AchievementsModule)
  .setupSwagger({
    title: 'Achievements API',
    version: '1.0',
    path: 'api/docs',
  })
  .enableValidation()
  .enableStaticAssets({
    path: '/assets',
    staticPath: assetsPath,
  })
  .launch();
