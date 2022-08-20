import {MigrationInterface, QueryRunner} from "typeorm";

export class addCodeToTableExpense1661037260289 implements MigrationInterface {
    name = 'addCodeToTableExpense1661037260289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expenses" ADD "code" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "code"`);
    }

}
