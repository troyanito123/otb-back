import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableExpenses1636412195285 implements MigrationInterface {
    name = 'createTableExpenses1636412195285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "expenses" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "amount" integer NOT NULL, "date" TIMESTAMP NOT NULL, "to_user" character varying NOT NULL, "from_user" character varying NOT NULL, CONSTRAINT "PK_94c3ceb17e3140abc9282c20610" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "expenses"`);
    }

}
