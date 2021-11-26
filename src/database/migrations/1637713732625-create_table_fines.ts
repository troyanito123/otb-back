import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableFines1637713732625 implements MigrationInterface {
    name = 'createTableFines1637713732625'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "fines" ("id" SERIAL NOT NULL, "fine_paid" integer NOT NULL, "date" TIMESTAMP NOT NULL, "userId" integer, "meetingId" integer, CONSTRAINT "PK_b706344bc8943ab7a88ed5d312e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "fines" ADD CONSTRAINT "FK_ab35fd41c8008b16a2aafe990b7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fines" ADD CONSTRAINT "FK_14b9385c31462a02df4dfe38efc" FOREIGN KEY ("meetingId") REFERENCES "meetings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fines" DROP CONSTRAINT "FK_14b9385c31462a02df4dfe38efc"`);
        await queryRunner.query(`ALTER TABLE "fines" DROP CONSTRAINT "FK_ab35fd41c8008b16a2aafe990b7"`);
        await queryRunner.query(`DROP TABLE "fines"`);
    }

}
