import { ArrayPaginatorProvider } from '../../../../providers/implementations/ArrayPaginatorProvider';
import { MySQLUsersRepository } from '../../repositories/implementations/MySQLUsersRepository';
import { IndexUserController } from './IndexUserController';
import { IndexUserUseCase } from './IndexUserUseCase';

const arrayPaginatorProvider = new ArrayPaginatorProvider();

const mySQLUsersRepository = new MySQLUsersRepository(arrayPaginatorProvider);

const indexUserUseCase = new IndexUserUseCase(mySQLUsersRepository);

const indexUserController = new IndexUserController(indexUserUseCase);

export { indexUserUseCase, indexUserController };
