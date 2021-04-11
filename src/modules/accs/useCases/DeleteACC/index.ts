import { MySQLACCsRepository } from '../../../../repositories/implementations/MySQLACCsRepository';
import { DeleteACCController } from './DeleteACCController';
import { DeleteACCUseCase } from './DeleteACCUseCase';

const mySQLACCsRepository = new MySQLACCsRepository();

const deleteACCUseCase = new DeleteACCUseCase(mySQLACCsRepository);

const deleteACCController = new DeleteACCController(deleteACCUseCase);

export { deleteACCUseCase, deleteACCController };
