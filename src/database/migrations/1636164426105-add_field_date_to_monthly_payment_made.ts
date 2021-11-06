import {MigrationInterface, QueryRunner} from "typeorm";

export class addFieldDateToMonthlyPaymentMade1636164426105 implements MigrationInterface {
    name = 'addFieldDateToMonthlyPaymentMade1636164426105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "monthly_payments_made" ADD "date" TIMESTAMP NOT NULL DEFAULT '2021-11-06T02:07:07.023Z'`);
        await queryRunner.query(`ALTER TABLE "certifications" ALTER COLUMN "date" SET DEFAULT '2021-11-06T02:07:07.031Z'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "certifications" ALTER COLUMN "date" SET DEFAULT '2021-11-05 13:15:03.474'`);
        await queryRunner.query(`ALTER TABLE "monthly_payments_made" DROP COLUMN "date"`);
    }

}
