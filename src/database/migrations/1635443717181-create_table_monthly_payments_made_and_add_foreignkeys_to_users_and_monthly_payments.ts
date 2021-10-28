import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableMonthlyPaymentsMadeAndAddForeignkeysToUsersAndMonthlyPayments1635443717181 implements MigrationInterface {
    name = 'createTableMonthlyPaymentsMadeAndAddForeignkeysToUsersAndMonthlyPayments1635443717181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "monthly_payments_made" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "userId" integer, "monthlyPaymetId" integer, CONSTRAINT "PK_3a276b3878a4ca1e15f1a6c28c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "monthly_payments_made" ADD CONSTRAINT "FK_6b09f848a25f255ea0595175fa6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "monthly_payments_made" ADD CONSTRAINT "FK_1a2cf31e97c7693659347b61a2d" FOREIGN KEY ("monthlyPaymetId") REFERENCES "monthly_payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "monthly_payments_made" DROP CONSTRAINT "FK_1a2cf31e97c7693659347b61a2d"`);
        await queryRunner.query(`ALTER TABLE "monthly_payments_made" DROP CONSTRAINT "FK_6b09f848a25f255ea0595175fa6"`);
        await queryRunner.query(`DROP TABLE "monthly_payments_made"`);
    }

}
