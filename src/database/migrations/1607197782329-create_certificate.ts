import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createCertificate1607197782329 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'certificate',
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
          name: 'size',
          type: 'integer',
          unsigned: true,
        },
        {
          name: 'type',
          type: 'varchar',
        },
        {
          name: 'file',
          type: 'mediumblob',
          isNullable: true,
        },
        {
          name: 'acc_id',
          type: 'integer',
          unsigned: true,
        }
      ],
      foreignKeys: [
        {
          name: 'FK_certificate__acc',
          columnNames: ['acc_id'],
          referencedTableName: 'acc',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('certificate');
  }
}
