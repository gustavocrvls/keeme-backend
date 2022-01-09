import { getRepository, Like } from 'typeorm';
import { Course } from '../../model/Course';
import {
  ICourseWithUsers,
  IGetCourseWithUsersDTO,
} from '../../useCases/GetCourseWithUsers/GetCourseWithUsersDTO';
import { IIndexCourseRequestDTO } from '../../useCases/IndexCourse/IndexCourseDTO';
import {
  IArrayPaginatorProvider,
  IPaginatedArray,
} from '../../../../providers/IArrayPaginatorProvider';
import { ICoursesRepository } from '../ICoursesRepository';

export class MySQLCoursesRepository implements ICoursesRepository {
  private arrayPaginator: IArrayPaginatorProvider;

  constructor(arrayPaginator?: IArrayPaginatorProvider) {
    if (arrayPaginator) this.arrayPaginator = arrayPaginator;
  }

  async create(course: Course): Promise<void> {
    const coursesRepository = getRepository(Course);
    await coursesRepository.save(course);
  }

  async index(data: IIndexCourseRequestDTO): Promise<IPaginatedArray> {
    const coursesRepository = getRepository(Course);

    const { name, sortField, limit } = data;
    let { sortOrder, page } = data;

    let coursesQuery = coursesRepository.createQueryBuilder('curso');

    if (name) coursesQuery = coursesQuery.where({ name: Like(`%${name}%`) });
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

  async getUsers(data: IGetCourseWithUsersDTO): Promise<ICourseWithUsers[]> {
    const coursesRepository = getRepository(Course);

    const { profileId, courseId } = data;

    let coursesQuery = coursesRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.users', 'users');

    if (profileId)
      coursesQuery = coursesQuery.andWhere('users.profile.id = :profileId', {
        profileId,
      });

    if (courseId)
      coursesQuery = coursesQuery.andWhere('course.id = :courseId', {
        courseId,
      });

    coursesQuery = coursesQuery.select([
      'course',
      'users.id',
      'users.name',
      'users.email',
    ]);

    const courses = await coursesQuery.getMany();

    return courses;
  }
}
