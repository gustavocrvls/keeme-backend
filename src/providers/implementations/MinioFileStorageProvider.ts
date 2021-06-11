import { getMinioClient } from '../../config/minio';
import { IFileStorageProvider } from '../IFileStorageProvider';

export class MinioFileStorageProvider implements IFileStorageProvider {
  async uploadFile(path: string, file: Express.Multer.File): Promise<void> {
    const metaData = {
      'Content-Type': file.mimetype,
    };

    const minioClient = getMinioClient();

    minioClient.fPutObject(
      process.env.MINIO_BUCKET_NAME || 'keeme',
      `${path}/${file.filename}`,
      file.path,
      metaData,
      (error: Error | null): void => {
        if (error) console.error(error.message);
        console.log('File uploaded successfully!');
      },
    );

    minioClient.presignedGetObject(
      process.env.MINIO_BUCKET_NAME || 'keeme',
      `${path}/${file.filename}`,
      24 * 60 * 60,
      (error: Error | null, presignedUrl: string): void => {
        if (error) console.error(error.message);
        console.log(presignedUrl);
      },
    );
  }
}
