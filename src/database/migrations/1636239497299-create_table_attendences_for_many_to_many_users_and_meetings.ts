import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableAttendencesForManyToManyUsersAndMeetings1636239497299 implements MigrationInterface {
    name = 'createTableAttendencesForManyToManyUsersAndMeetings1636239497299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "attendences" ("id" SERIAL NOT NULL, "userId" integer, "meetingId" integer, CONSTRAINT "PK_48b8e690d65013c58b030901166" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "attendences" ADD CONSTRAINT "FK_90aa572566b545c62b074b52fde" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendences" ADD CONSTRAINT "FK_6a19536812ea0b53ca0979b0c0f" FOREIGN KEY ("meetingId") REFERENCES "meetings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendences" DROP CONSTRAINT "FK_6a19536812ea0b53ca0979b0c0f"`);
        await queryRunner.query(`ALTER TABLE "attendences" DROP CONSTRAINT "FK_90aa572566b545c62b074b52fde"`);
        await queryRunner.query(`DROP TABLE "attendences"`);
    }

}
