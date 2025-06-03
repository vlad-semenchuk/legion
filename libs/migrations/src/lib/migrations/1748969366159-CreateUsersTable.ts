import { getDbSchema } from '@app/database';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1748969366159 implements MigrationInterface {
  name = 'CreateUsersTable1748969366159';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const schema = getDbSchema(queryRunner);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "${schema}"."users" (
        "id" SERIAL NOT NULL,
        "twitter" VARCHAR(15) NOT NULL,
        "wallet" VARCHAR(42) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_users" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_users_twitter_wallet" UNIQUE ("twitter", "wallet")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const schema = getDbSchema(queryRunner);

    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."users"`);
  }
}
