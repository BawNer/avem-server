import {MigrationInterface, QueryRunner} from "typeorm";

export class EventsWithUsers1655809553391 implements MigrationInterface {
    name = 'EventsWithUsers1655809553391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ADD "authorId" integer`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_96ce126fb3f1b5368f8e3c02989" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_96ce126fb3f1b5368f8e3c02989"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "authorId"`);
    }

}
