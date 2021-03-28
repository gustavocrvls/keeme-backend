import { MySQLACCsRepository } from '../../../../repositories/implementations/MySQLACCsRepository';
import { CreateACCController } from './CreateACCController';
import { CreateACCUseCase } from './CreateACCUseCase';

const mySQLACCsRepository = new MySQLACCsRepository();

const createACCUseCase = new CreateACCUseCase(mySQLACCsRepository);

const createACCController = new CreateACCController(createACCUseCase);

export { createACCUseCase, createACCController };
