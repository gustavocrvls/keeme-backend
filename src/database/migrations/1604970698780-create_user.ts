import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUser1604970698780 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
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
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'registration',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'username',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'profile_id',
            type: 'integer',
            unsigned: true,
          },
          {
            name: 'course_id',
            type: 'integer',
            unsigned: true,
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'FK_user__profile',
            columnNames: ['profile_id'],
            referencedTableName: 'profile',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_user__course',
            columnNames: ['course_id'],
            referencedTableName: 'course',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
