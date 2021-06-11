import { MySQLUsersRepository } from '../../../../repositories/implementations/MySQLUsersRepository';
import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';

const mySQLUsersRepository = new MySQLUsersRepository();

const createUserUseCase = new CreateUserUseCase(mySQLUsersRepository);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
