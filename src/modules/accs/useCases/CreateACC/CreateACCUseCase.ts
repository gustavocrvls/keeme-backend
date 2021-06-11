import { ACC } from '../../../../entities/ACC';
import { IFileStorageProvider } from '../../../../providers/IFileStorageProvider';
import { IACCsRepository } from '../../../../repositories/IACCsRepository';
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

    this.fileStorageProvider.uploadFile('certificates', acc.certificate);

    const newACC = new ACC(data);
    await this.accsRepository.create(newACC);
  }
}
