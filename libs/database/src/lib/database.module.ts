import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './database.config';

@Module({})
export class DatabaseModule {
  static forRootFromEnv(
    migrationsLoader: () => string[] = () => [],
  ): DynamicModule {
    return TypeOrmModule.forRootAsync(
      DatabaseConfig(migrationsLoader).asProvider(),
    );
  }
}
