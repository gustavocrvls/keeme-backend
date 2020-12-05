import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createAcc1605141662310 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'acc',
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
          name: 'quantidade',
          type: 'integer'
        },
        {
          name: 'sobre',
          type: 'varchar',
        },
        {
          name: 'id_usuario',
          type: 'integer',
          unsigned: true,
        },
        {
          name: 'id_status_da_acc',
          type: 'integer',
          unsigned: true,
          default: 1,
        },
        {
          name: 'id_tipo_de_acc',
          type: 'integer',
          unsigned: true,
        },
        {
          name: 'id_certificado',
          type: 'integer',
          unsigned: true,
          isNullable: true,
        },
      ],
      foreignKeys: [
        {
          name: 'FK_acc__usuario',
          columnNames: ['id_usuario'],
          referencedTableName: 'usuario',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        {
          name: 'FK_acc__status_da_acc',
          columnNames: ['id_status_da_acc'],
          referencedTableName: 'status_da_acc',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        {
          name: 'FK_acc__tipo_de_acc',
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
    await queryRunner.dropTable('acc');
  }

}
