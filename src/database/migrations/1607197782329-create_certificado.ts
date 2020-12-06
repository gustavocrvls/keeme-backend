import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createCertificado1607197782329 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'certificado',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'nome',
          type: 'varchar',
        },
        {
          name: 'tamanho',
          type: 'integer',
          unsigned: true,
        },
        {
          name: 'tipo',
          type: 'varchar',
        },
        {
          name: 'arquivo',
          type: 'mediumblob',
        },
        {
          name: 'id_acc',
          type: 'integer',
          unsigned: true,
          isNullable: true,
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('certificado');
  }
}
