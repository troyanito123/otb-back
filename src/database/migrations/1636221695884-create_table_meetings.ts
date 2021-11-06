import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableMeetings1636221695884 implements MigrationInterface {
    name = 'createTableMeetings1636221695884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "meetings" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "date" TIMESTAMP NOT NULL, "fine_amount" integer NOT NULL, "conlutions" text NOT NULL, CONSTRAINT "PK_aa73be861afa77eb4ed31f3ed57" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "meetings"`);
    }

}
