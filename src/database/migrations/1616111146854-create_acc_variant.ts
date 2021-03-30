import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createVariante1616111146854 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'acc_variant',
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
              name: 'description',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'points_per_unity',
              type: 'float',
            },
            {
              name: 'acc_type_id',
              type: 'integer',
              unsigned: true,
            },
          ],
          foreignKeys: [
            {
              name: 'FK_variante_de_acc__acc_type',
              columnNames: ['acc_type_id'],
              referencedTableName: 'acc_type',
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
