import { MigrationInterface, QueryRunner } from "typeorm";

export class Bbb1793289819845 implements MigrationInterface {
    name = 'Bbb1793289819845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
    }

}
