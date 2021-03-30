import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createACCType1605140065523 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
    name: 'acc_type',
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
          name: 'point_limit',
          type: 'integer',
        },
        {
          name: 'description',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'unity_of_measurement_id',
          type: 'integer',
          unsigned: true,
        },
      ],
      foreignKeys: [
        {
          name: 'FK_acc_type__unity_of_measurement',
          columnNames: ['unity_of_measurement_id'],
          referencedTableName: 'unity_of_measurement',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('acc_type');
  }

}
