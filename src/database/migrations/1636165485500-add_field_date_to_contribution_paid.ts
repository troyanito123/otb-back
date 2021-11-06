import {MigrationInterface, QueryRunner} from "typeorm";

export class addFieldDateToContributionPaid1636165485500 implements MigrationInterface {
    name = 'addFieldDateToContributionPaid1636165485500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contributions_paid" ADD "date" TIMESTAMP NOT NULL DEFAULT '2021-11-06T02:24:46.370Z'`);
        await queryRunner.query(`ALTER TABLE "monthly_payments_made" ALTER COLUMN "date" SET DEFAULT '2021-11-06T02:24:46.366Z'`);
        await queryRunner.query(`ALTER TABLE "certifications" ALTER COLUMN "date" SET DEFAULT '2021-11-06T02:24:46.374Z'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "certifications" ALTER COLUMN "date" SET DEFAULT '2021-11-06 02:07:07.031'`);
        await queryRunner.query(`ALTER TABLE "monthly_payments_made" ALTER COLUMN "date" SET DEFAULT '2021-11-06 02:07:07.023'`);
        await queryRunner.query(`ALTER TABLE "contributions_paid" DROP COLUMN "date"`);
    }

}
