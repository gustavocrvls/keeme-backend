export interface IGetCourseWithUsersDTO {
  profileId?: number;
  courseId?: number;
}

export interface CourseUser {
  id: number;
  name: string;
  email: string;
}

export interface ICourseWithUsers {
  id: number;
  name: string;
  users: CourseUser[];
}
