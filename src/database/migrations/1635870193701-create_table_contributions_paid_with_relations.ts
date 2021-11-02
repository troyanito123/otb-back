import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableContributionsPaidWithRelations1635870193701 implements MigrationInterface {
    name = 'createTableContributionsPaidWithRelations1635870193701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contributions_paid" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "userId" integer, "contributionId" integer, CONSTRAINT "PK_5c75857cb1268db9f9712cb0b75" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contributions_paid" ADD CONSTRAINT "FK_5d1be5b0da93344eda74be56bcc" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contributions_paid" ADD CONSTRAINT "FK_5a3e8ed201c0e14fe700cf8fc64" FOREIGN KEY ("contributionId") REFERENCES "contributions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contributions_paid" DROP CONSTRAINT "FK_5a3e8ed201c0e14fe700cf8fc64"`);
        await queryRunner.query(`ALTER TABLE "contributions_paid" DROP CONSTRAINT "FK_5d1be5b0da93344eda74be56bcc"`);
        await queryRunner.query(`DROP TABLE "contributions_paid"`);
    }

}
