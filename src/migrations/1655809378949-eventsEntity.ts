import {MigrationInterface, QueryRunner} from "typeorm";

export class eventsEntity1655809378949 implements MigrationInterface {
    name = 'eventsEntity1655809378949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "events"`);
    }

}
