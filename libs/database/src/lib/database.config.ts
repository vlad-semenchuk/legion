import { Env } from '@app/config';
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

export const DatabaseConfig = (loader: () => string[]) =>
  registerAs('database', (): TypeOrmModuleOptions & DataSourceOptions => {
    const cert = Env.optionalString('DATABASE_CA_CERT');

    return {
      type: 'postgres',
      url: Env.string('DATABASE_URL'),
      logging: Env.optionalBoolean('DATABASE_LOGGING', false),

      migrations: loader(),

      autoLoadEntities: true,
      poolSize: 100,
      schema: Env.optionalString('DATABASE_SCHEMA', 'public'),

      ssl: cert ? { ca: atob(cert) } : undefined,
      migrationsRun: Env.optionalBoolean('DATABASE_RUN_MIGRATIONS', false),
    };
  });
