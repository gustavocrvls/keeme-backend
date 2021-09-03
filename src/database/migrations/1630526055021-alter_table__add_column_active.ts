import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class alterTable_addColumnActive1630526055021 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn(
        {
          name: 'active',
          type: 'boolean',
          default: true,
          isNullable: false
        }
      )
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
