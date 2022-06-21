import {MigrationInterface, QueryRunner} from "typeorm";

export class audienceEntity1655815848720 implements MigrationInterface {
    name = 'audienceEntity1655815848720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "audience" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "audience" character varying NOT NULL, CONSTRAINT "PK_2ecf18dc010ddf7e956afd9866b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "audience"`);
    }

}
