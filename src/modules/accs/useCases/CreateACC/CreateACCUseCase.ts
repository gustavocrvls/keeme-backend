import { ACC } from '../../../../entities/ACC';
import { IACCsRepository } from '../../../../repositories/IACCsRepository';
import { ICreateACCDTO } from './CreateACCDTO';

export class CreateACCUseCase {
  private accsRepository;

  constructor(accsRepository: IACCsRepository) {
    this.accsRepository = accsRepository;
  }

  async execute(data: ICreateACCDTO): Promise<void> {
    const acc = new ACC(data);
    await this.accsRepository.create(acc);
  }
}
