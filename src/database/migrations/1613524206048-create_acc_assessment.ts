import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createACCAssesment1613524206048 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'acc_assessment',
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
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'criated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'acc_id',
            type: 'integer',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'integer',
            unsigned: true,
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: 'FK_acc_assessment__user',
            columnNames: ['user_id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_acc_assessment__acc',
            columnNames: ['acc_id'],
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
    await queryRunner.dropTable('acc_assessment');
  }
}
