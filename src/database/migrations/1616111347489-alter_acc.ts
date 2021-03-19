import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class alterAcc1616111347489 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'acc',
        new TableColumn(
          {
            name: 'id_variante_de_acc',
            type: 'integer',
            unsigned: true,
          }
        )
      );

      await queryRunner.createForeignKey(
        'acc',
        new TableForeignKey({
          name: 'FK_acc__variante_de_acc',
          columnNames: ['id_variante_de_acc'],
          referencedTableName: 'variante_de_acc',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
