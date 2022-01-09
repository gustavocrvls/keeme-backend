import { ACC } from '../../../../entities/ACC';
import { IFileStorageProvider } from '../../../../providers/IFileStorageProvider';
import { IACCsRepository } from '../../../../repositories/IACCsRepository';
import { IShowACCDTO, ShowACCResponse } from './ShowACCDTO';

export class ShowACCUseCase {
  private accsRepository: IACCsRepository;

  private fileStorageProvider: IFileStorageProvider;

  constructor(
    accsRepository: IACCsRepository,
    fileStorageProvider: IFileStorageProvider,
  ) {
    this.accsRepository = accsRepository;
    this.fileStorageProvider = fileStorageProvider;
  }

  async execute(data: IShowACCDTO): Promise<ShowACCResponse> {
    const acc = await this.accsRepository.show(data);

    const certificateURL = await this.fileStorageProvider.getFileUrl(
      'certificates',
      acc.certificate,
    );

    const accData = {
      ...acc,
      certificate_url: certificateURL,
    };

    return accData;
  }
}
