import { getRepository, Repository } from 'typeorm';
import Curso from '../../models/Curso';
import { ICoursesRepository } from '../ICoursesRepository';

/**
 * @author Gustavo Carvalho Silva
 * @since 19/03/2021
 * @class MySQLCoursesRepository
 * @implements ICoursesRepository
 */
export class MySQLCoursesRepository implements ICoursesRepository {
  private coursesRepository: Repository<Curso>;

  async save(course: Curso): Promise<void> {
    this.coursesRepository = getRepository(Curso);
    this.coursesRepository.save(course);
  }
}
