import {MigrationInterface, QueryRunner} from "typeorm";

export class UsersEntity1646645142179 implements MigrationInterface {
    name = 'UsersEntity1646645142179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "roleId" integer, "groupId" integer, "username" character varying NOT NULL, "bio" character varying NOT NULL, "photo" character varying, "phone" character varying, "email" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "refreshToken" character varying NOT NULL, "lastSignIn" TIMESTAMP NOT NULL DEFAULT now(), "isEmailActive" boolean NOT NULL DEFAULT false, "isPhoneActive" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
