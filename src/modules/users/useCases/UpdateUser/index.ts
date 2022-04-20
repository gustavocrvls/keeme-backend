import { MySQLUsersRepository } from '../../repositories/implementations/MySQLUsersRepository';
import { UpdateUserController } from './UpdateUserController';
import { UpdateUserUseCase } from './UpdateUserUseCase';

const mySQLUsersRepository = new MySQLUsersRepository();

const updateUserUseCase = new UpdateUserUseCase(mySQLUsersRepository);

const updateUserController = new UpdateUserController(updateUserUseCase);

export { updateUserUseCase, updateUserController };
