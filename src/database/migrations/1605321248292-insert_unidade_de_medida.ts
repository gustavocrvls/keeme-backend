import { MigrationInterface, QueryRunner } from "typeorm";

export class insertUnidadeDeMedida1605321248292 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO unidade_de_medida (id, name) VALUES
      (1, 'Hora'),
      (2, 'Evento'),
      (3, 'Semestre');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM unidade_de_medida WHERE id = 1;
    `);
    await queryRunner.query(`
      DELETE FROM unidade_de_medida WHERE id = 2;
    `);
    await queryRunner.query(`
      DELETE FROM unidade_de_medida WHERE id = 3;
    `);
  }

}
