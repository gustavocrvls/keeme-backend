import { ACC } from '../../model/ACC';
import { IFileStorageProvider } from '../../../../providers/IFileStorageProvider';
import { IACCsRepository } from '../../repositories/IACCsRepository';
import { ICreateACCDTO } from './CreateACCDTO';

export class CreateACCUseCase {
  private accsRepository: IACCsRepository;

  private fileStorageProvider: IFileStorageProvider;

  constructor(
    accsRepository: IACCsRepository,
    fileStorageProvider: IFileStorageProvider,
  ) {
    this.accsRepository = accsRepository;
    this.fileStorageProvider = fileStorageProvider;
  }

  async execute(acc: ICreateACCDTO): Promise<void> {
    const data = {
      quantity: acc.quantity,
      description: acc.description,
      user: acc.user,
      acc_type: acc.acc_type,
      acc_variant: acc.acc_variant,
      certificate: acc.certificate.filename,
    };

    await this.fileStorageProvider.uploadFile('certificates', acc.certificate);
    await this.accsRepository.create(new ACC(data));
  }
}
