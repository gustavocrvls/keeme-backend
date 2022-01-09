import { MySQLACCTypesRepository } from '../../repositories/implementations/MySQLACCTypesRepository';
import { ShowACCTypeController } from './ShowACCTypeController';
import { ShowACCTypeUseCase } from './ShowACCTypeUseCase';

const mySQLACCTypesRepository = new MySQLACCTypesRepository();

const showACCTypeUseCase = new ShowACCTypeUseCase(mySQLACCTypesRepository);

const showACCTypeController = new ShowACCTypeController(showACCTypeUseCase);

export { showACCTypeUseCase, showACCTypeController };
