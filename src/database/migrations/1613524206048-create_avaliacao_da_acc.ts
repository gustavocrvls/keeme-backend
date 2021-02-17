import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createAvaliacaoDaAcc1613524206048 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'avaliacao_da_acc',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'descricao',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'id_acc',
            type: 'integer',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'id_usuario',
            type: 'integer',
            unsigned: true,
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: 'FK_avaliacao_da_acc__usuario',
            columnNames: ['id_usuario'],
            referencedTableName: 'usuario',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_avaliacao_da_acc__acc',
            columnNames: ['id_acc'],
            referencedTableName: 'acc',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('avaliacao_da_acc');
  }
}
