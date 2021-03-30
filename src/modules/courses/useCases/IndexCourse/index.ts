import { ArrayPaginatorProvider } from '../../../../providers/implementations/ArrayPaginatorProvider';
import { MySQLCoursesRepository } from '../../../../repositories/implementations/MySQLCoursesRepository';
import { IndexCourseController } from './IndexCourseController';
import { IndexCourseUseCase } from './IndexCourseUseCase';

const arrayPaginatorProvider = new ArrayPaginatorProvider();

const mySQLCoursesRepository = new MySQLCoursesRepository(
  arrayPaginatorProvider,
);

const indexCourseUseCase = new IndexCourseUseCase(mySQLCoursesRepository);

const indexCourseController = new IndexCourseController(indexCourseUseCase);

export { indexCourseUseCase, indexCourseController };
