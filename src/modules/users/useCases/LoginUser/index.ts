import { MySQLUsersRepository } from '../../../../repositories/implementations/MySQLUsersRepository';
import { LoginUserController } from './LoginUserController';
import { LoginUserUseCase } from './LoginUserUseCase';

const mySQLUsersRepository = new MySQLUsersRepository();

const loginUserUseCase = new LoginUserUseCase(mySQLUsersRepository);

const loginUserController = new LoginUserController(loginUserUseCase);

export { loginUserUseCase, loginUserController };
