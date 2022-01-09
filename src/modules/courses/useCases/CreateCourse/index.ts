import { MySQLCoursesRepository } from '../../repositories/implementations/MySQLCoursesRepository';
import { CreateCourseController } from './CreateCourseController';
import { CreateCourseUseCase } from './CreateCourseUseCase';

const mySQLCoursesRepository = new MySQLCoursesRepository();

const createCourseUseCase = new CreateCourseUseCase(mySQLCoursesRepository);

const createCourseController = new CreateCourseController(createCourseUseCase);

export { createCourseUseCase, createCourseController };
