import { DatabaseModule } from '@app/database';
import { migrationsLoader } from '@app/migrations';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementsController } from './controllers/achievements.controller';
import { RootController } from './controllers/root.controller';
import { BadgeEntity } from './entities/badge.entity';
import { UserBadgeEntity } from './entities/user-badge.entity';
import { UserEntity } from './entities/user.entity';
import { AchievementsService } from './services/achievements.service';
import { BadgeService } from './services/badge.service';
import { UserBadgesService } from './services/user-badges.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    DatabaseModule.forRootFromEnv(migrationsLoader),
    TypeOrmModule.forFeature([UserEntity, BadgeEntity, UserBadgeEntity]),
  ],
  controllers: [RootController, AchievementsController],
  providers: [
    UserService,
    BadgeService,
    UserBadgesService,
    AchievementsService,
  ],
})
export class AchievementsModule {}
