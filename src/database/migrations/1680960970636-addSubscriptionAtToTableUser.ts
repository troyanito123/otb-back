import {MigrationInterface, QueryRunner} from "typeorm";

export class addSubscriptionAtToTableUser1680960970636 implements MigrationInterface {
    name = 'addSubscriptionAtToTableUser1680960970636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "subscription_at" character varying NOT NULL DEFAULT '2021-05-01T00:00:00.000Z'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "subscription_at"`);
    }

}
