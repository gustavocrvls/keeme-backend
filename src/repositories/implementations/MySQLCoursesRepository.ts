import { getRepository, Like, Repository } from 'typeorm';
import Curso from '../../models/Curso';
import {
  IArrayPaginatorProvider,
  IPaginatedArray,
} from '../../providers/IArrayPaginatorProvider';
import { IIndexCourseRequestDTO } from '../../useCases/IndexCourse/IndexCourseDTO';
import { ICoursesRepository } from '../ICoursesRepository';

export class MySQLCoursesRepository implements ICoursesRepository {
  private coursesRepository: Repository<Curso>;

  private arrayPaginator: IArrayPaginatorProvider;

  constructor(arrayPaginator?: IArrayPaginatorProvider) {
    if (arrayPaginator) this.arrayPaginator = arrayPaginator;
  }

  async save(course: Curso): Promise<void> {
    this.coursesRepository = getRepository(Curso);
    await this.coursesRepository.save(course);
  }

  async index(data: IIndexCourseRequestDTO): Promise<IPaginatedArray> {
    const { nome, sortField, limit } = data;
    let { sortOrder, page } = data;

    this.coursesRepository = getRepository(Curso);
    let coursesQuery = this.coursesRepository.createQueryBuilder('curso');

    if (nome) coursesQuery = coursesQuery.where({ nome: Like(`%${nome}%`) });
    if (!sortOrder) sortOrder = 'ASC';
    if (sortField)
      coursesQuery = coursesQuery.orderBy({ [sortField]: sortOrder });

    if (limit && limit !== undefined && page && page !== undefined) {
      if (page > 0) page -= 1;
      coursesQuery = coursesQuery.take(limit).skip(page * limit);
    }

    const courses = await coursesQuery.getMany();
    const total_items = await coursesQuery.getCount();

    return this.arrayPaginator.paginate(courses, page + 1, limit, total_items);
  }
}
