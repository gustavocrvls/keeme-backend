import { MigrationInterface, QueryRunner } from "typeorm";

export class insertPerfil1605320983576 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO perfil (id, name) VALUES
      (1, 'Administrador'),
      (2, 'Coordenador'),
      (3, 'Discente');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM perfil WHERE id = 1;
    `);
    await queryRunner.query(`
      DELETE FROM perfil WHERE id = 2;
    `);
    await queryRunner.query(`
      DELETE FROM perfil WHERE id = 3;
    `);
  }

}
