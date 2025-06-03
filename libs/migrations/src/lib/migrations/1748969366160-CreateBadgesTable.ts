import { getDbSchema } from '@app/database';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBadgesTable1748969366160 implements MigrationInterface {
  name = 'CreateBadgesTable1748969366160';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const schema = getDbSchema(queryRunner);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "${schema}"."badges" (
        "id" VARCHAR(100) NOT NULL,
        "type" VARCHAR(50) NOT NULL,
        "icon" VARCHAR(255) NOT NULL,
        "title" VARCHAR(100) NOT NULL,
        "description" TEXT NOT NULL,
        "lore" TEXT NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_badges" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      INSERT INTO "${schema}"."badges" ("id", "type", "icon", "title", "description", "lore")
      VALUES 
        ('onchain-early-staker', 'onchain', 'onchain-icon.png', 'Early Staker', 'Awarded for staking tokens within the first 100 blocks of genesis.', 'When the chain was but a spark, you forged the first commitment. Validators still whisper of your courage.'),
        ('twitter-ecosystem-voice', 'twitter', 'twitter-icon.png', 'Ecosystem Voice', 'Awarded for tweeting consistently about the protocol and hitting 10,000+ impressions.', 'In the realm of hashtags and handles, your words echoed far and wide, rallying the curious and the bold.')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const schema = getDbSchema(queryRunner);

    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."badges"`);
  }
}
