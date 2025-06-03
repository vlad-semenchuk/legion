import { DatabaseModule } from '@app/database';
import { migrationsLoader } from '@app/migrations';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { RootController } from './controllers/root.controller';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';

@Module({
  imports: [
    DatabaseModule.forRootFromEnv(migrationsLoader),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [RootController, AppController],
  providers: [UserService],
})
export class AppModule {}
