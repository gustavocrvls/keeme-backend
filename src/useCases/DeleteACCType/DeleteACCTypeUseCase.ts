import { IACCTypesRepository } from '../../repositories/IACCTypesRepository';
import { IDeleteACCTypeRequestDTO } from './DeleteACCTypeDTO';

export class DeleteACCTypeUseCase {
  private accTypesRepository;

  constructor(accTypesRepository: IACCTypesRepository) {
    this.accTypesRepository = accTypesRepository;
  }

  async execute(data: IDeleteACCTypeRequestDTO): Promise<void> {
    await this.accTypesRepository.delete(data);
  }
}
