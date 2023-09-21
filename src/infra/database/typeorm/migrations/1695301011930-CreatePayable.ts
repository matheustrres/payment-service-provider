import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class CreatePayable1695301011930 implements MigrationInterface {
	public name: string = 'CreatePayable1695301011930';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
      CREATE TABLE "payables" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "transactionId" character varying NOT NULL,
        "status" character varying NOT NULL,
        "paymentDate" date NOT NULL,
        "fee" numeric NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT 'now()',
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_33adb2ad800095b1f556f01b2c3" PRIMARY KEY ("id")
      )
    `);
		await queryRunner.query(`
      ALTER TABLE "transactions" DROP COLUMN "payableId"
    `);
		await queryRunner.query(`
      ALTER TABLE "transactions"
      ADD "payableId" uuid
    `);
		await queryRunner.query(`
      ALTER TABLE "transactions"
      ADD CONSTRAINT "UQ_21093aacd4d5d58756b856b0f29" UNIQUE ("payableId")
    `);
		await queryRunner.query(`
      ALTER TABLE "transactions"
      ALTER COLUMN "createdAt"
      SET DEFAULT 'now()'
    `);
		await queryRunner.query(`
      ALTER TABLE "transactions"
      ADD CONSTRAINT "FK_21093aacd4d5d58756b856b0f29" FOREIGN KEY ("payableId") REFERENCES "payables"("id") ON DELETE CASCADE ON UPDATE NO ACTION
    `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
      ALTER TABLE "transactions" DROP CONSTRAINT "FK_21093aacd4d5d58756b856b0f29"
    `);
		await queryRunner.query(`
      ALTER TABLE "transactions"
      ALTER COLUMN "createdAt"
      SET DEFAULT '2023-09-19 16:46:45.086358'
    `);
		await queryRunner.query(`
      ALTER TABLE "transactions" DROP CONSTRAINT "UQ_21093aacd4d5d58756b856b0f29"
    `);
		await queryRunner.query(`
      ALTER TABLE "transactions" DROP COLUMN "payableId"
    `);
		await queryRunner.query(`
      ALTER TABLE "transactions"
      ADD "payableId" character varying
    `);
		await queryRunner.query(`DROP TABLE "payables"`);
	}
}
