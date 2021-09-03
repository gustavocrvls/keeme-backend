import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class alterAcc1616111347489 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'acc',
      new TableColumn(
        {
          name: 'acc_variant_id',
          type: 'integer',
          unsigned: true,
        }
      )
    );

    await queryRunner.createForeignKey(
      'acc',
      new TableForeignKey({
        name: 'FK_acc__acc_variant',
        columnNames: ['acc_variant_id'],
        referencedTableName: 'acc_variant',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
