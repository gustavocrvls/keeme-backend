import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createVariante1616111146854 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'variante_de_acc',
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
              name: 'descricao',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'pontos_por_unidade',
              type: 'integer',
            },
            {
              name: 'id_tipo_de_acc',
              type: 'integer',
              unsigned: true,
            },
          ],
          foreignKeys: [
            {
              name: 'FK_variante_de_acc__tipo_de_acc',
              columnNames: ['id_tipo_de_acc'],
              referencedTableName: 'tipo_de_acc',
              referencedColumnNames: ['id'],
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE',
            },
          ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('variante_da_acc');
  }

}
