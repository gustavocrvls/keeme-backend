import { Certificate } from '../entities/Certificate';

export interface ICertificatesRepository {
  show(id: number): Promise<Certificate>;
}
