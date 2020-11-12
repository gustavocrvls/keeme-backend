import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createTipoDeAcc1605140065523 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
    name: 'tipo_de_acc',
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
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'pontos_por_unidade',
          type: 'decimal'
        },
        {
          name: 'limite_de_pontos',
          type: 'integer',
        },
        {
          name: 'sobre',
          type: 'varchar',
        },
        {
          name: 'id_unidade_de_medida',
          type: 'integer',
          unsigned: true,
        },
      ]
    }));

    await queryRunner.createForeignKey("tipo_de_acc", new TableForeignKey({
      columnNames: ['id_unidade_de_medida'],
      referencedTableName: 'unidade_de_medida',
      referencedColumnNames: ['id'],
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tipo_de_acc');
  }

}
