import {MigrationInterface, QueryRunner} from "typeorm";

export class changed1623180855187 implements MigrationInterface {
    name = 'changed1623180855187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "slug"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "slug" character varying NOT NULL`);
    }

}
