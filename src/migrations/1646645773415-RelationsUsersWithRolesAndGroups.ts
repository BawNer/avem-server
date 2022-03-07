import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationsUsersWithRolesAndGroups1646645773415 implements MigrationInterface {
    name = 'RelationsUsersWithRolesAndGroups1646645773415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "access" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "roleId" integer, "groupId" integer, "username" character varying NOT NULL, "bio" character varying NOT NULL, "photo" character varying, "phone" character varying, "email" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "refreshToken" character varying NOT NULL, "lastsignIn" TIMESTAMP NOT NULL DEFAULT now(), "isEmailActive" boolean NOT NULL DEFAULT false, "isPhoneActive" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "groups" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "groups"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
