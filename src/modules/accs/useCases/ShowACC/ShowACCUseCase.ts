import { ACC } from '../../../../entities/ACC';
import { IACCsRepository } from '../../../../repositories/IACCsRepository';
import { IShowACCDTO } from './ShowACCDTO';

export class ShowACCUseCase {
  private accsRepository;

  constructor(accsRepository: IACCsRepository) {
    this.accsRepository = accsRepository;
  }

  async execute(data: IShowACCDTO): Promise<ACC> {
    const acc = await this.accsRepository.show(data);
    return acc;
  }
}
