// eslint-disable-next-line @typescript-eslint/no-var-requires
const Minio = require('minio');

export const getMinioClient = () => {

  return new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT ?? '',
    port: Number(process.env.MINIO_PORT),
    useSSL: process.env.MINIO_USE_SSL && process.env.MINIO_USE_SSL === 'true' ? true : false,
    accessKey: process.env.MINIO_ACCESS_KEY_ID ?? '',
    secretKey: process.env.MINIO_SECRET_ACCESS_KEY ?? '',
  });
}
