import { MySQLACCTypesRepository } from '../../repositories/implementations/MySQLACCTypesRepository';
import { DeleteACCTypeController } from './DeleteACCTypeController';
import { DeleteACCTypeUseCase } from './DeleteACCTypeUseCase';

const mySQLACCTypesRepository = new MySQLACCTypesRepository();

const deleteACCTypeUseCase = new DeleteACCTypeUseCase(mySQLACCTypesRepository);

const deleteACCTypeController = new DeleteACCTypeController(
  deleteACCTypeUseCase,
);

export { deleteACCTypeUseCase, deleteACCTypeController };
