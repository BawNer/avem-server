import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTokenEntity1646916313321 implements MigrationInterface {
    name = 'CreateTokenEntity1646916313321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "token" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tokens"`);
    }

}