import { getRepository, Like, Repository } from 'typeorm';
import Curso from '../../models/Curso';
import { IIndexCourseRequestDTO } from '../../useCases/IndexCourse/IndexCourseDTO';
import { ICoursesRepository } from '../ICoursesRepository';

export class MySQLCoursesRepository implements ICoursesRepository {
  private coursesRepository: Repository<Curso>;

  async save(course: Curso): Promise<void> {
    this.coursesRepository = getRepository(Curso);
    await this.coursesRepository.save(course);
  }

  async index(data: IIndexCourseRequestDTO): Promise<Curso[]> {
    const { nome, sortField } = data;
    let { sortOrder } = data;

    this.coursesRepository = getRepository(Curso);
    let coursesQuery = this.coursesRepository.createQueryBuilder('curso');

    if (nome) coursesQuery = coursesQuery.where({ nome: Like(`%${nome}%`) });
    if (!sortOrder) sortOrder = 'ASC';
    if (sortField)
      coursesQuery = coursesQuery.orderBy({ [sortField]: sortOrder });

    const courses = await coursesQuery.getMany();
    return courses;
  }
}
