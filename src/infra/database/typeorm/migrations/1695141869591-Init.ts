import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class Init1695141869591 implements MigrationInterface {
	public name: string = 'Init1695141869591';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "email" character varying NOT NULL,
        "password" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )
    `);
		await queryRunner.query(`
      CREATE TABLE "transactions" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        "payableId" character varying,
        "value" numeric NOT NULL,
        "paymentMethod" character varying NOT NULL,
        "description" character varying,
        "cardCVV" character varying(3) NOT NULL,
        "cardExpirationDate" date NOT NULL,
        "cardOwnerName" character varying NOT NULL,
        "cardNumber" character varying(4) NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT 'now()',
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id")
      )
    `);
		await queryRunner.query(`
      ALTER TABLE "transactions"
      ADD CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
      ALTER TABLE "transactions" DROP CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41"
    `);
		await queryRunner.query(`DROP TABLE "transactions"`);
		await queryRunner.query(`DROP TABLE "users"`);
	}
}
