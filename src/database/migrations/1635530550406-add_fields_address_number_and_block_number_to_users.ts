import {MigrationInterface, QueryRunner} from "typeorm";

export class addFieldsAddressNumberAndBlockNumberToUsers1635530550406 implements MigrationInterface {
    name = 'addFieldsAddressNumberAndBlockNumberToUsers1635530550406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "address_number" character varying NOT NULL DEFAULT 'UNDEFINED'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "block_number" character varying NOT NULL DEFAULT 'UNDEFINED'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "block_number"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address_number"`);
    }

}
