import { ArrayPaginatorProvider } from '../../providers/implementations/ArrayPaginatorProvider';
import { MySQLACCTypesRepository } from '../../repositories/implementations/MySQLACCTypesRepository';
import { IndexACCTypeController } from './IndexACCTypeController';
import { IndexACCTypeUseCase } from './IndexACCTypeUseCase';

const arrayPaginatorProvider = new ArrayPaginatorProvider();

const mySQLACCTypesRepository = new MySQLACCTypesRepository(
  arrayPaginatorProvider,
);

const indexACCTypeUseCase = new IndexACCTypeUseCase(mySQLACCTypesRepository);

const indexACCTypeController = new IndexACCTypeController(indexACCTypeUseCase);

export { indexACCTypeUseCase, indexACCTypeController };
