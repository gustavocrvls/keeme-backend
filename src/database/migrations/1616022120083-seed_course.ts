import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { CourseSeed } from '../seeds/course.seed';

export class seedCourse1616022120083 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository('course').save(CourseSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await getRepository('course').delete({});
  }
}
