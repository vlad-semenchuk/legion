import { Env } from '@app/config';
import { resolve } from 'path';

export function migrationsLoader(): string[] {
  if (!Env.optionalBoolean('DATABASE_RUN_MIGRATIONS', false)) {
    return [resolve(__dirname, './migrations/*.{js,ts}')];
  }

  const contexts = (require as any).context('./migrations', true, /\.ts$/);

  return contexts
    .keys()
    .map((modulePath: any) => contexts(modulePath))
    .flatMap(Object.values);
}
