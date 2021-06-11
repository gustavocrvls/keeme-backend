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


/**
 *
    const minioClient = new Minio.Client({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: 'minioadmin',
      secretKey: 'minioadmin',
    });

    const metaData = {
      'Content-Type': acc.certificate.mimetype,
    };

    minioClient.fPutObject(
      'keeme',
      `certificates/${acc.certificate.filename}`,
      acc.certificate.path,
      metaData,
      (error: Error): void => {
        if (error) console.error(error.message);
        console.log('File uploaded successfully!');
      },
    );
 */
