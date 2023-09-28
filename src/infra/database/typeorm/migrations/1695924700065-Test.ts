import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class Test1695924700065 implements MigrationInterface {
	public name: string = 'Test1695924700065';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
      ALTER TABLE "payables"
      ADD "userId" uuid NOT NULL
  `);
		await queryRunner.query(`
      ALTER TABLE "transactions"
      ALTER COLUMN "createdAt"
      SET DEFAULT 'now()'
    `);
		await queryRunner.query(`
      ALTER TABLE "payables"
      ALTER COLUMN "createdAt"
      SET DEFAULT 'now()'
    `);
		await queryRunner.query(`
      ALTER TABLE "payables"
      ADD CONSTRAINT "FK_da0f9ce92e77833f113e31cbab3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
      ALTER TABLE "payables" DROP CONSTRAINT "FK_da0f9ce92e77833f113e31cbab3"
    `);
		await queryRunner.query(`
      ALTER TABLE "payables"
      ALTER COLUMN "createdAt"
      SET DEFAULT '2023-09-27 22:05:08.656073'
    `);
		await queryRunner.query(`
      ALTER TABLE "transactions"
      ALTER COLUMN "createdAt"
      SET DEFAULT '2023-09-27 22:05:08.656073'
    `);
		await queryRunner.query(`
      ALTER TABLE "payables" DROP COLUMN "userId"
    `);
	}
}
