import fs from 'fs';
import path from 'path';
import { getMinioClient } from '../../config/minio';
import { IFileStorageProvider } from '../IFileStorageProvider';

export class MinioFileStorageProvider implements IFileStorageProvider {
  async uploadFile(filePath: string, file: Express.Multer.File): Promise<void> {
    const minioClient = getMinioClient();

    const metaData = {
      'Content-Type': file.mimetype,
    };

    await minioClient.fPutObject(
      process.env.MINIO_BUCKET_NAME || 'keeme',
      `${filePath}/${file.filename}`,
      file.path,
      metaData,
      (error: Error | null): void => {
        if (error) console.error(error.message);
        else console.log('File uploaded successfully!');

        fs.unlinkSync(file.path);
      },
    );
  }

  async getFileUrl(filePath: string, filename: string): Promise<string> {
    const minioClient = getMinioClient();

    const certificateUrl = await minioClient.presignedGetObject(
      process.env.MINIO_BUCKET_NAME || 'keeme',
      `${filePath}/${filename}`,
      1 * 24 * 60 * 60, // 1 day
    );

    return certificateUrl;
  }
}
