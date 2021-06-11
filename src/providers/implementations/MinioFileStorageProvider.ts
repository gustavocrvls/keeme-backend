import { getMinioClient } from '../../config/minio';
import { IFileStorageProvider } from '../IFileStorageProvider';

export class MinioFileStorageProvider implements IFileStorageProvider {
  async uploadFile(path: string, file: Express.Multer.File): Promise<void> {
    const metaData = {
      'Content-Type': file.mimetype,
    };

    getMinioClient().fPutObject(
      'keeme',
      `${path}/${file.filename}`,
      file.path,
      metaData,
      (error: Error | null): void => {
        if (error) console.error(error.message);
        console.log('File uploaded successfully!');
      },
    );
  }
}
