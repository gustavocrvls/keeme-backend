import * as Minio from 'minio';

export const getMinioClient = (): Minio.Client => {
  return new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT ?? '',
    port: Number(process.env.MINIO_PORT),
    useSSL: !!(
      process.env.MINIO_USE_SSL && process.env.MINIO_USE_SSL === 'true'
    ),
    accessKey: process.env.MINIO_ACCESS_KEY_ID ?? '',
    secretKey: process.env.MINIO_SECRET_ACCESS_KEY ?? '',
  });
};
