import {MigrationInterface, QueryRunner} from "typeorm";

export class fixTokenPLS1647022508916 implements MigrationInterface {
    name = 'fixTokenPLS1647022508916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "access"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "access" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "access"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "access" character varying NOT NULL`);
    }

}
