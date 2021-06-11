import { MySQLUsersRepository } from '../../../../repositories/implementations/MySQLUsersRepository';
import { ShowUserController } from './ShowUserController';
import { ShowUserUseCase } from './ShowUserUseCase';

const mySQLUsersRepository = new MySQLUsersRepository();

const showUserUseCase = new ShowUserUseCase(mySQLUsersRepository);

const showUserController = new ShowUserController(showUserUseCase);

export { showUserUseCase, showUserController };
