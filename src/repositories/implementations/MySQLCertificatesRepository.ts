import { getRepository, Repository } from 'typeorm';
import { Certificate } from '../../entities/Certificate';
import { ICertificatesRepository } from '../ICertificatesRepository';

export class MySQLCertificatesRepository implements ICertificatesRepository {
  private certificateRepository: Repository<Certificate>;

  async show(id: number): Promise<Certificate> {
    this.certificateRepository = getRepository(Certificate);
    const certificate = await this.certificateRepository.findOneOrFail(id);
    return certificate;
  }
}
