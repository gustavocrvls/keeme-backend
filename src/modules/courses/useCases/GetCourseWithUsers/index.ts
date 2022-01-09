import { MySQLCoursesRepository } from '../../repositories/implementations/MySQLCoursesRepository';
import { GetCourseWithUsersController } from './GetCourseWithUsersController';
import { GetCourseWithUsersUseCase } from './GetCourseWithUsersUseCase';

const mySQLCoursesRepository = new MySQLCoursesRepository();

const getCourseWithUsersUseCase = new GetCourseWithUsersUseCase(
  mySQLCoursesRepository,
);

const getCourseWithUsersController = new GetCourseWithUsersController(
  getCourseWithUsersUseCase,
);

export { getCourseWithUsersUseCase, getCourseWithUsersController };
