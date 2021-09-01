export interface ICreateUserDTO {
  name: string;
  registration: string;
  email: string;
  username: string;
  password?: string;
  profile: number;
  course: number;
}
