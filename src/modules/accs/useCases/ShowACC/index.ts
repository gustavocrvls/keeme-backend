import { MySQLACCsRepository } from '../../../../repositories/implementations/MySQLACCsRepository';
import { ShowACCController } from './ShowACCController';
import { ShowACCUseCase } from './ShowACCUseCase';

const mySQLACCsRepository = new MySQLACCsRepository();

const showACCUseCase = new ShowACCUseCase(mySQLACCsRepository);

const showACCController = new ShowACCController(showACCUseCase);

export { showACCUseCase, showACCController };
