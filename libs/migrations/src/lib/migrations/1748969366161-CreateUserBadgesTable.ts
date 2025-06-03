import { getDbSchema } from '@app/database';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserBadgesTable1748969366161 implements MigrationInterface {
  name = 'CreateUserBadgesTable1748969366161';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const schema = getDbSchema(queryRunner);

    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "${schema}"."user_badges" (
        "user_id" BIGINT NOT NULL REFERENCES "${schema}"."users"("id") ON DELETE CASCADE,
        "badge_id" VARCHAR NOT NULL REFERENCES "${schema}"."badges"("id") ON DELETE CASCADE,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        PRIMARY KEY ("user_id", "badge_id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const schema = getDbSchema(queryRunner);

    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."user_badges"`);
  }
}
