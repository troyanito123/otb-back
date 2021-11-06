import {MigrationInterface, QueryRunner} from "typeorm";

export class fixFieldConclutionsOnTableMeetings1636222469441 implements MigrationInterface {
    name = 'fixFieldConclutionsOnTableMeetings1636222469441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetings" RENAME COLUMN "conlutions" TO "conclutions"`);
        await queryRunner.query(`ALTER TABLE "meetings" ALTER COLUMN "conclutions" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetings" ALTER COLUMN "conclutions" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "meetings" RENAME COLUMN "conclutions" TO "conlutions"`);
    }

}
