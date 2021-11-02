import {MigrationInterface, QueryRunner} from "typeorm";

export class createTabeContributions1635867309663 implements MigrationInterface {
    name = 'createTabeContributions1635867309663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contributions" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "amount" integer NOT NULL, CONSTRAINT "PK_ca2b4f39eb9e32a61278c711f79" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contributions"`);
    }

}
