import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableMonthlyPayments1635431080944 implements MigrationInterface {
    name = 'createTableMonthlyPayments1635431080944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "monthly_payments" ("id" SERIAL NOT NULL, "month" character varying NOT NULL, "year" character varying NOT NULL, "amount" integer NOT NULL, CONSTRAINT "PK_97593e8159b2d12dc4bfb3d58c7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "monthly_payments"`);
    }

}
