import {MigrationInterface, QueryRunner} from "typeorm";

export class addFieldIdentificationNumberToTableUser1635595224353 implements MigrationInterface {
    name = 'addFieldIdentificationNumberToTableUser1635595224353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "identification_number" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "identification_number"`);
    }

}
