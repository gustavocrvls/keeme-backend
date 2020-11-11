import { MigrationInterface, QueryRunner } from "typeorm";

export class insertPerfil1605044948246 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO perfil (name) VALUES 
      ('administrador'),
      ('coordenador'),
      ('discente');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM perfil WHERE name = 'administrador';
    `);
    await queryRunner.query(`
      DELETE FROM perfil WHERE name = 'coordenador';
    `);
    await queryRunner.query(`
      DELETE FROM perfil WHERE name = 'discente';
    `);
  }

}
