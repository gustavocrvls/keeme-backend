import faker from 'faker';
import { IFileStorageProvider } from '../../IFileStorageProvider';

export class MinioFileStorageProvider implements IFileStorageProvider {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async uploadFile(path: string, file: Express.Multer.File): Promise<void> {}

  getFileUrl(path: string, filename: string): Promise<string> {
    return new Promise(() => faker.internet.url());
  }
}
