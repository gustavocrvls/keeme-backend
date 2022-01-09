import { MinioFileStorageProvider } from '../../../../providers/implementations/MinioFileStorageProvider';
import { MySQLACCsRepository } from '../../repositories/implementations/MySQLACCsRepository';
import { ShowACCController } from './ShowACCController';
import { ShowACCUseCase } from './ShowACCUseCase';

const mySQLACCsRepository = new MySQLACCsRepository();

const minioFileStorageProvider = new MinioFileStorageProvider();

const showACCUseCase = new ShowACCUseCase(
  mySQLACCsRepository,
  minioFileStorageProvider,
);

const showACCController = new ShowACCController(showACCUseCase);

export { showACCUseCase, showACCController };
