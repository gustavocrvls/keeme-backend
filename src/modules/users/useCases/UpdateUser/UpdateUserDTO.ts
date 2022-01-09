import { Course } from '../../../courses/model/Course';
import { Profile } from '../../../profile/model/Profile';

export interface IUpdateUserRequestDTO {
  id: number;
  name?: string;
  registration?: string;
  email?: string;
  username?: string;
  password?: string;
  profile?: Profile;
  course?: Course;
  active?: boolean;
}
