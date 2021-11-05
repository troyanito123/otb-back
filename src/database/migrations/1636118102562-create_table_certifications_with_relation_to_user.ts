import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableCertificationsWithRelationToUser1636118102562 implements MigrationInterface {
    name = 'createTableCertificationsWithRelationToUser1636118102562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "certifications" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "amount" integer NOT NULL, "type" character varying NOT NULL DEFAULT 'SIMPLE', "date" TIMESTAMP NOT NULL DEFAULT '2021-11-05T13:15:03.474Z', "userId" integer, CONSTRAINT "PK_fd763d412e4a1fb1b6dadd6e72b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "certifications" ADD CONSTRAINT "FK_c5d9770c24adc7be0680f9bd963" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "certifications" DROP CONSTRAINT "FK_c5d9770c24adc7be0680f9bd963"`);
        await queryRunner.query(`DROP TABLE "certifications"`);
    }

}
