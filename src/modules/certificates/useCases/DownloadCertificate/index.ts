import { MySQLCertificatesRepository } from '../../../../repositories/implementations/MySQLCertificatesRepository';
import { DownloadCertificateController } from './DownloadCertificateController';
import { DownloadCertificateUseCase } from './DownloadCertificateUseCase';

const mySQLCertificateRepository = new MySQLCertificatesRepository();

const downloadCertificateUseCase = new DownloadCertificateUseCase(
  mySQLCertificateRepository,
);

const downloadCertificateController = new DownloadCertificateController(
  downloadCertificateUseCase,
);

export { downloadCertificateUseCase, downloadCertificateController };
