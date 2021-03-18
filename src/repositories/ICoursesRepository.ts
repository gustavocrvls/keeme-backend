import Course from '../models/Curso';

export interface ICoursesRepository {
  save(course: Course): Promise<void>;
}
