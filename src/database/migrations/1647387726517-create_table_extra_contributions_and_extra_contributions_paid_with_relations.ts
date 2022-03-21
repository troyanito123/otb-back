import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableExtraContributionsAndExtraContributionsPaidWithRelations1647387726517 implements MigrationInterface {
    name = 'createTableExtraContributionsAndExtraContributionsPaidWithRelations1647387726517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "extra_contributions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "amount" integer NOT NULL, "status" character varying NOT NULL DEFAULT 'ACTIVE', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_facb9090a3f8d3b7a37680266fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "extra_contributions_paid" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "date" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "extraContributionId" integer, CONSTRAINT "PK_06f1f946bc2cd1350c543670884" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "extra_contributions_paid" ADD CONSTRAINT "FK_15a58ac41f71904f72fe4d637ed" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "extra_contributions_paid" ADD CONSTRAINT "FK_9473bb313f6a581d694c47989d4" FOREIGN KEY ("extraContributionId") REFERENCES "extra_contributions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "extra_contributions_paid" DROP CONSTRAINT "FK_9473bb313f6a581d694c47989d4"`);
        await queryRunner.query(`ALTER TABLE "extra_contributions_paid" DROP CONSTRAINT "FK_15a58ac41f71904f72fe4d637ed"`);
        await queryRunner.query(`DROP TABLE "extra_contributions_paid"`);
        await queryRunner.query(`DROP TABLE "extra_contributions"`);
    }

}
