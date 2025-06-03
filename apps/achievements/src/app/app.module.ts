import { DatabaseModule } from '@app/database';
import { migrationsLoader } from '@app/migrations';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { RootController } from './controllers/root.controller';
import { Badge } from './entities/badge.entity';
import { UserBadge } from './entities/user-badge.entity';
import { User } from './entities/user.entity';
import { BadgeService } from './services/badge.service';
import { UserBadgesService } from './services/user-badges.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    DatabaseModule.forRootFromEnv(migrationsLoader),
    TypeOrmModule.forFeature([User, Badge, UserBadge]),
  ],
  controllers: [RootController, AppController],
  providers: [UserService, BadgeService, UserBadgesService],
})
export class AppModule {}
