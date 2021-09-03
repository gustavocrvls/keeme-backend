import { MySQLUsersRepository } from '../../../../repositories/implementations/MySQLUsersRepository';
import { DeleteUserControler } from './DeleteUserControler';
import { DeleteUserUseCase } from './DeleteUserUseCase';

const mySQLUsersRepository = new MySQLUsersRepository();

const deleteUserUseCase = new DeleteUserUseCase(mySQLUsersRepository);

const deleteUserController = new DeleteUserControler(deleteUserUseCase);

export { deleteUserUseCase, deleteUserController };
