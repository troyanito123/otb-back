import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFieldsYearAndTypeToTableMeetings1756665535784 implements MigrationInterface {
    name = 'AddFieldsYearAndTypeToTableMeetings1756665535784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetings" ADD "year" character varying`);
        await queryRunner.query(`ALTER TABLE "meetings" ADD "type" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetings" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "meetings" DROP COLUMN "year"`);
    }

}
