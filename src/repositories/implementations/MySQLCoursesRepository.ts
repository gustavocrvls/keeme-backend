import { getRepository, Repository } from 'typeorm';
import Curso from '../../models/Curso';
import { ICoursesRepository } from '../ICoursesRepository';

export class MySQLCoursesRepository implements ICoursesRepository {
  private coursesRepository: Repository<Curso>;

  async save(course: Curso): Promise<void> {
    this.coursesRepository = getRepository(Curso);
    this.coursesRepository.save(course);
  }
}
