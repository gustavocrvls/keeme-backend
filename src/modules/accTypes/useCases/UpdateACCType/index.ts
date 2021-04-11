import { MySQLACCTypesRepository } from '../../../../repositories/implementations/MySQLACCTypesRepository';
import { UpdateACCTypeController } from './UpdateACCTypeController';
import { UpdateACCTypeUseCase } from './UpdateACCTypeUseCase';

const mySQLACCTypesRepository = new MySQLACCTypesRepository();

const updateACCTypeUseCase = new UpdateACCTypeUseCase(mySQLACCTypesRepository);

const updateACCTypeController = new UpdateACCTypeController(
  updateACCTypeUseCase,
);

export { updateACCTypeUseCase, updateACCTypeController };
