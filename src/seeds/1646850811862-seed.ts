import {MigrationInterface, QueryRunner} from "typeorm";

export class Seed1646850811862 implements MigrationInterface {
    name = 'Seed1646850811862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO groups (name) VALUES ('default group')`)
        await queryRunner.query(`INSERT INTO roles (name, access) VALUES ('Студент', 'authorized')`)
        await queryRunner.query(`INSERT INTO users (username, bio, email, login, password, "refreshToken") VALUES ('СКФ МТУСИ', 'Администрация СКФ МТУСИ', 'skf-mtusi@mtusi.ru', 'root', '$2b$10$SbdBOv6pL3b/71MPaGoriuA/j6GCmvMVpPn1WZIRvSb8KoDI9wYvC', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InJvb3QiLCJ1c2VybmFtZSI6ItCh0JrQpCDQnNCi0KPQodCYIiwiaWF0IjoxNjQ2OTEzODAyfQ.1vTZ8JMtJWY62TuvFyHHu4EgdABmWCLvrTZ8dhr0bBw')`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}

}
