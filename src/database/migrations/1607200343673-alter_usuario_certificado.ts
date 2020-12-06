import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class alterUsuarioCertificado1607200343673 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey("acc", new TableForeignKey({
      name: 'fk_acc__certificado',
      columnNames: ['id_certificado'],
      referencedColumnNames: ['id'],
      referencedTableName: 'certificado',
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    }));

    await queryRunner.createForeignKey("certificado", new TableForeignKey({
      name: 'fk_certificado__acc',
      columnNames: ['id_acc'],
      referencedColumnNames: ['id'],
      referencedTableName: 'acc',
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
