import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class JoinTransaction1695333638914 implements MigrationInterface {
	public name: string = 'JoinTransaction1695333638914';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
      ALTER TABLE "transactions"
      ALTER COLUMN "createdAt"
      SET DEFAULT 'now()'
    `);
		await queryRunner.query(`
      ALTER TABLE "payables" DROP COLUMN "transactionId"
    `);
		await queryRunner.query(`
      ALTER TABLE "payables"
      ADD "transactionId" uuid NOT NULL
    `);
		await queryRunner.query(`
      ALTER TABLE "payables"
      ADD CONSTRAINT "UQ_8c39946fbf382dd8b623da66c16" UNIQUE ("transactionId")
    `);
		await queryRunner.query(`
      ALTER TABLE "payables"
      ALTER COLUMN "createdAt"
      SET DEFAULT 'now()'
    `);
		await queryRunner.query(`
      ALTER TABLE "payables"
      ADD CONSTRAINT "FK_8c39946fbf382dd8b623da66c16" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
      ALTER TABLE "payables" DROP CONSTRAINT "FK_8c39946fbf382dd8b623da66c16"
    `);
		await queryRunner.query(`
      ALTER TABLE "payables"
      ALTER COLUMN "createdAt"
      SET DEFAULT 'now()'
    `);
		await queryRunner.query(`
      ALTER TABLE "payables" DROP CONSTRAINT "UQ_8c39946fbf382dd8b623da66c16"
    `);
		await queryRunner.query(`
      ALTER TABLE "payables" DROP COLUMN "transactionId"
    `);
		await queryRunner.query(`
      ALTER TABLE "payables"
      ADD "transactionId" character varying NOT NULL
    `);
		await queryRunner.query(`
      ALTER TABLE "transactions"
      ALTER COLUMN "createdAt"
      SET DEFAULT 'now()'
    `);
	}
}
