import { ArrayPaginatorProvider } from '../../providers/implementations/ArrayPaginatorProvider';
import { MySQLACCTypesRepository } from '../../repositories/implementations/MySQLACCTypesRepository';
import { ShowACCTypeController } from './ShowACCTypeController';
import { ShowACCTypeUseCase } from './ShowACCTypeUseCase';

const arrayPaginatorProvider = new ArrayPaginatorProvider();

const mySQLACCTypesRepository = new MySQLACCTypesRepository(
  arrayPaginatorProvider,
);

const showACCTypeUseCase = new ShowACCTypeUseCase(mySQLACCTypesRepository);

const showACCTypeController = new ShowACCTypeController(showACCTypeUseCase);

export { showACCTypeUseCase, showACCTypeController };
