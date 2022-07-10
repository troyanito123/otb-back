import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableIncomeWithRelationUser1657401182821 implements MigrationInterface {
    name = 'createTableIncomeWithRelationUser1657401182821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "incomes" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "description" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "status" character varying NOT NULL DEFAULT 'ACTIVE', "userId" integer, CONSTRAINT "PK_d737b3d0314c1f0da5461a55e5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "incomes" ADD CONSTRAINT "FK_f6b7c6bbe04a203dfc67ae627ab" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "incomes" DROP CONSTRAINT "FK_f6b7c6bbe04a203dfc67ae627ab"`);
        await queryRunner.query(`DROP TABLE "incomes"`);
    }

}
