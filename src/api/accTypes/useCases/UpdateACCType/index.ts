import { MySQLACCTypesRepository } from '../../repositories/implementations/MySQLACCTypesRepository';
import { MySQLACCVariantsRepository } from '../../../accVariants/repositories/implementations/MySQLACCVariantsRepository';
import { UpdateACCTypeController } from './UpdateACCTypeController';
import { UpdateACCTypeUseCase } from './UpdateACCTypeUseCase';

const mySQLACCTypesRepository = new MySQLACCTypesRepository();
const mySQLACCVariantsRepository = new MySQLACCVariantsRepository();

const updateACCTypeUseCase = new UpdateACCTypeUseCase(
  mySQLACCTypesRepository,
  mySQLACCVariantsRepository,
);

const updateACCTypeController = new UpdateACCTypeController(
  updateACCTypeUseCase,
);

export { updateACCTypeUseCase, updateACCTypeController };
