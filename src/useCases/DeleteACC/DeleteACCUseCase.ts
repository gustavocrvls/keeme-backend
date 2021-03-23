import { IACCsRepository } from '../../repositories/IACCsRepository';
import { IDeleteACCRequestDTO } from './DeleteACCDTO';

export class DeleteACCUseCase {
  private accsRepository;

  constructor(accRepository: IACCsRepository) {
    this.accsRepository = accRepository;
  }

  async execute(data: IDeleteACCRequestDTO): Promise<void> {
    await this.accsRepository.delete(data);
  }
}
