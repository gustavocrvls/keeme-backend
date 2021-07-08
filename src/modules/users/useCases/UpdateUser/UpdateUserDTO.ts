import { Course } from '../../../../entities/Course';
import { Profile } from '../../../../entities/Profile';

export interface IUpdateUserRequestDTO {
  id: number;
  name?: string;
  registration?: string;
  email?: string;
  username?: string;
  password?: string;
  profile?: Profile;
  course?: Course;
}
