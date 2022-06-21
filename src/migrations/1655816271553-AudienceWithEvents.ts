import {MigrationInterface, QueryRunner} from "typeorm";

export class AudienceWithEvents1655816271553 implements MigrationInterface {
    name = 'AudienceWithEvents1655816271553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ADD "audienceId" integer`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_009f2e21f29b4d58d56b2381ae5" FOREIGN KEY ("audienceId") REFERENCES "audience"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_009f2e21f29b4d58d56b2381ae5"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "audienceId"`);
    }

}
