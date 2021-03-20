import { MySQLCoursesRepository } from '../../repositories/implementations/MySQLCoursesRepository';
import { IndexCourseController } from './IndexCourseController';
import { IndexCourseUseCase } from './IndexCourseUseCase';

const mySQLCoursesRepository = new MySQLCoursesRepository();

const indexCourseUseCase = new IndexCourseUseCase(mySQLCoursesRepository);

const indexCourseController = new IndexCourseController(indexCourseUseCase);

export { indexCourseUseCase, indexCourseController };
