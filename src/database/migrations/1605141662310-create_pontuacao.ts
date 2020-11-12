import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createPontuacao1605141662310 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'pontuacao',
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
          name: 'ativa',
          type: 'boolean',
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
          name: 'id_status_da_pontuacao',
          type: 'integer',
          unsigned: true,
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
        },
      ]
    }));

    await queryRunner.createForeignKey("pontuacao", new TableForeignKey({
      name: 'FK_pontuacao_status_da_pontuacao',
      columnNames: ['id_status_da_pontuacao'],
      referencedTableName: 'status_da_pontuacao',
      referencedColumnNames: ['id'],
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }));
    
    await queryRunner.createForeignKey("pontuacao", new TableForeignKey({
      name: 'FK_pontuacao_tipo_de_acc',
      columnNames: ['id_tipo_de_acc'],
      referencedTableName: 'tipo_de_acc',
      referencedColumnNames: ['id'],
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pontuacao');
  }

}
