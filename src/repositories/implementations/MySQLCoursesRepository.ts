import { getRepository, Like, Repository } from 'typeorm';
import { Course } from '../../entities/Course';
import { IIndexCourseRequestDTO } from '../../modules/courses/useCases/IndexCourse/IndexCourseDTO';
import {
  IArrayPaginatorProvider,
  IPaginatedArray,
} from '../../providers/IArrayPaginatorProvider';
import { ICoursesRepository } from '../ICoursesRepository';

export class MySQLCoursesRepository implements ICoursesRepository {
  private coursesRepository: Repository<Course>;

  private arrayPaginator: IArrayPaginatorProvider;

  constructor(arrayPaginator?: IArrayPaginatorProvider) {
    if (arrayPaginator) this.arrayPaginator = arrayPaginator;
  }

  async create(course: Course): Promise<void> {
    this.coursesRepository = getRepository(Course);
    await this.coursesRepository.save(course);
  }

  async index(data: IIndexCourseRequestDTO): Promise<IPaginatedArray> {
    this.coursesRepository = getRepository(Course);

    const { nome, sortField, limit } = data;
    let { sortOrder, page } = data;

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
