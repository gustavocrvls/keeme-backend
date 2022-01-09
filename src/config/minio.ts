import * as Minio from 'minio';

export const getMinioClient = (): Minio.Client => {
  return new Minio.Client({
    endPoint: process.env.STORAGE_ENDPOINT ?? '',
    port: Number(process.env.STORAGE_PORT),
    useSSL: !!(
      process.env.STORAGE_USE_SSL && process.env.STORAGE_USE_SSL === 'true'
    ),
    accessKey: process.env.STORAGE_ACCESS_KEY_ID ?? '',
    secretKey: process.env.STORAGE_SECRET_ACCESS_KEY ?? '',
  });
};
