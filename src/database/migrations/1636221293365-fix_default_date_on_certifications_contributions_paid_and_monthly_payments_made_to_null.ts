import {MigrationInterface, QueryRunner} from "typeorm";

export class fixDefaultDateOnCertificationsContributionsPaidAndMonthlyPaymentsMadeToNull1636221293365 implements MigrationInterface {
    name = 'fixDefaultDateOnCertificationsContributionsPaidAndMonthlyPaymentsMadeToNull1636221293365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "monthly_payments_made" ALTER COLUMN "date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "monthly_payments_made" ALTER COLUMN "date" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "contributions_paid" ALTER COLUMN "date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contributions_paid" ALTER COLUMN "date" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "certifications" ALTER COLUMN "date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "certifications" ALTER COLUMN "date" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "certifications" ALTER COLUMN "date" SET DEFAULT '2021-01-01 00:01:00'`);
        await queryRunner.query(`ALTER TABLE "certifications" ALTER COLUMN "date" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contributions_paid" ALTER COLUMN "date" SET DEFAULT '2021-01-01 00:01:00'`);
        await queryRunner.query(`ALTER TABLE "contributions_paid" ALTER COLUMN "date" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "monthly_payments_made" ALTER COLUMN "date" SET DEFAULT '2021-01-01 00:01:00'`);
        await queryRunner.query(`ALTER TABLE "monthly_payments_made" ALTER COLUMN "date" SET NOT NULL`);
    }

}
