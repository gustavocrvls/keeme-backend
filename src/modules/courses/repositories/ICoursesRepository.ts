import { Course } from '../model/Course';
import {
  ICourseWithUsers,
  IGetCourseWithUsersDTO,
} from '../useCases/GetCourseWithUsers/GetCourseWithUsersDTO';
import { IIndexCourseRequestDTO } from '../useCases/IndexCourse/IndexCourseDTO';
import { IPaginatedArray } from '../../../providers/IArrayPaginatorProvider';

export interface ICoursesRepository {
  create(course: Course): Promise<void>;
  index(data: IIndexCourseRequestDTO): Promise<IPaginatedArray>;

  getUsers(data: IGetCourseWithUsersDTO): Promise<ICourseWithUsers[]>;
}
