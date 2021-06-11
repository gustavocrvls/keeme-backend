import { User } from '../../../../entities/User';

export interface IGetCourseWithUsersDTO {
  profileId?: number;
  courseId?: number;
}

export interface ICourseWithUsers {
  id: number;
  name: string;
  users: User[];
}
