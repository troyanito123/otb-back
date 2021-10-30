import {MigrationInterface, QueryRunner} from "typeorm";

export class changeDefaultValueInFieldStatusOnTableUsers1635595881501 implements MigrationInterface {
    name = 'changeDefaultValueInFieldStatusOnTableUsers1635595881501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'INACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`);
    }

}
