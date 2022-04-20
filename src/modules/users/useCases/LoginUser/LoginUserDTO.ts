import { User } from '../../model/User';

export interface ILoginUserDTO {
  username: string;
  password: string;
}

export interface ILoginUserResponse {
  auth: boolean;
  token?: string;
  data: User | undefined;
}
