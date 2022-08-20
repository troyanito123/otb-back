import {MigrationInterface, QueryRunner} from "typeorm";

export class createExpenseCodeTable1661037587506 implements MigrationInterface {
    name = 'createExpenseCodeTable1661037587506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "expense-code" ("id" SERIAL NOT NULL, "current-code" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_1ef85ec501785d98c87d699c19f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "expense-code"`);
    }

}
