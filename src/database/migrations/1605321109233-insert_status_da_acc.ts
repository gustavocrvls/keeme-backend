import { MigrationInterface, QueryRunner } from "typeorm";

export class insertStatusDaAcc1605321109233 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO status_da_acc (id, nome) VALUES
      (1, 'Em Análise'),
      (2, 'Aprovada'),
      (3, 'Negada');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM status_da_acc WHERE id = 1;
    `);
    await queryRunner.query(`
      DELETE FROM status_da_acc WHERE id = 2;
    `);
    await queryRunner.query(`
      DELETE FROM status_da_acc WHERE id = 3;
    `);
  }

}
