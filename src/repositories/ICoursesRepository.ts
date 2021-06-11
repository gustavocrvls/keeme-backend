import { Course } from '../entities/Course';
import {
  ICourseWithUsers,
  IGetCourseWithUsersDTO,
} from '../modules/courses/useCases/GetCourseWithUsers/GetCourseWithUsersDTO';
import { IIndexCourseRequestDTO } from '../modules/courses/useCases/IndexCourse/IndexCourseDTO';
import { IPaginatedArray } from '../providers/IArrayPaginatorProvider';

export interface ICoursesRepository {
  create(course: Course): Promise<void>;
  index(data: IIndexCourseRequestDTO): Promise<IPaginatedArray>;

  getUsers(data: IGetCourseWithUsersDTO): Promise<ICourseWithUsers[]>;
}
