import {MigrationInterface, QueryRunner} from "typeorm";

export class fixDefaultDateOnCertificationsContributionsPaidAndMonthlyPaymentsMade1636220822506 implements MigrationInterface {
    name = 'fixDefaultDateOnCertificationsContributionsPaidAndMonthlyPaymentsMade1636220822506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "monthly_payments_made" ALTER COLUMN "date" SET DEFAULT '2021-01-01 00:01:00.000'`);
        await queryRunner.query(`ALTER TABLE "contributions_paid" ALTER COLUMN "date" SET DEFAULT '2021-01-01 00:01:00.000'`);
        await queryRunner.query(`ALTER TABLE "certifications" ALTER COLUMN "date" SET DEFAULT '2021-01-01 00:01:00.000'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "certifications" ALTER COLUMN "date" SET DEFAULT '2021-11-06 02:24:46.374'`);
        await queryRunner.query(`ALTER TABLE "contributions_paid" ALTER COLUMN "date" SET DEFAULT '2021-11-06 02:24:46.37'`);
        await queryRunner.query(`ALTER TABLE "monthly_payments_made" ALTER COLUMN "date" SET DEFAULT '2021-11-06 02:24:46.366'`);
    }

}
