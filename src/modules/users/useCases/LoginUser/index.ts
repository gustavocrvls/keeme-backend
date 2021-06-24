import { SIGAuthenticationProvider } from '../../../../providers/implementations/SIGAuthenticationProvider';
import { ExternalAuthenticationMock } from '../../../../providers/mocks/ExternalAuthenticationMock';
import { MySQLUsersRepository } from '../../../../repositories/implementations/MySQLUsersRepository';
import { LoginUserController } from './LoginUserController';
import { LoginUserUseCase } from './LoginUserUseCase';

const mySQLUsersRepository = new MySQLUsersRepository();

const externalAuthenticationProvider = new ExternalAuthenticationMock();
// const externalAuthenticationProvider = new SIGAuthenticationProvider();

const loginUserUseCase = new LoginUserUseCase(
  mySQLUsersRepository,
  externalAuthenticationProvider,
);

const loginUserController = new LoginUserController(loginUserUseCase);

export { loginUserUseCase, loginUserController };
