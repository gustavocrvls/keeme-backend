import { MySQLACCTypesRepository } from '../../repositories/implementations/MySQLACCTypesRepository';
import { CreateACCTypeController } from './CreateACCTypeController';
import { CreateACCTypeUseCase } from './CreateACCTypeUseCase';

const mySQLACCTypesRepository = new MySQLACCTypesRepository();

const createACCTypeUseCase = new CreateACCTypeUseCase(mySQLACCTypesRepository);

const createACCTypeController = new CreateACCTypeController(
  createACCTypeUseCase,
);

export { createACCTypeUseCase, createACCTypeController };
