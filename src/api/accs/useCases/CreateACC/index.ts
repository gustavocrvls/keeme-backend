import { MinioFileStorageProvider } from '../../../../providers/implementations/MinioFileStorageProvider';
import { MySQLACCsRepository } from '../../repositories/implementations/MySQLACCsRepository';
import { CreateACCController } from './CreateACCController';
import { CreateACCUseCase } from './CreateACCUseCase';

const mySQLACCsRepository = new MySQLACCsRepository();

const minioFileStorageProvider = new MinioFileStorageProvider();

const createACCUseCase = new CreateACCUseCase(
  mySQLACCsRepository,
  minioFileStorageProvider,
);

const createACCController = new CreateACCController(createACCUseCase);

export { createACCUseCase, createACCController };
