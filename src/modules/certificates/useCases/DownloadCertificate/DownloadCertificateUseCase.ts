import { Certificate } from '../../../../entities/Certificate';
import { ICertificatesRepository } from '../../../../repositories/ICertificatesRepository';
import { IDownloadCertificateRequestDTO } from './DownloadCertificateDTO';

export class DownloadCertificateUseCase {
  private certificatesRepository;

  constructor(certificatesRepository: ICertificatesRepository) {
    this.certificatesRepository = certificatesRepository;
  }

  public async execute(
    data: IDownloadCertificateRequestDTO,
  ): Promise<Certificate> {
    const certificate = this.certificatesRepository.show(data.id);
    return certificate;
  }
}
