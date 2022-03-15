import {MigrationInterface, QueryRunner} from "typeorm";

export class newsEntity1647361833963 implements MigrationInterface {
    name = 'newsEntity1647361833963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "title" character varying NOT NULL, "annonce" character varying NOT NULL, "content" character varying NOT NULL, "photos" text, "preview" character varying, "visible" text NOT NULL DEFAULT 'all', "tags" text, "meta" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "news"`);
    }

}
