import { ArrayPaginatorProvider } from '../../providers/implementations/ArrayPaginatorProvider';
import { MySQLACCsRepository } from '../../repositories/implementations/MySQLACCsRepository';
import { IndexACCController } from './IndexACCController';
import { IndexACCUseCase } from './IndexACCUseCase';

const arrayPaginatorProvider = new ArrayPaginatorProvider();

const mySQLACCsRepository = new MySQLACCsRepository(arrayPaginatorProvider);

const indexACCUseCase = new IndexACCUseCase(mySQLACCsRepository);

const indexACCController = new IndexACCController(indexACCUseCase);

export { indexACCUseCase, indexACCController };
