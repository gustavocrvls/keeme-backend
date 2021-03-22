import { IACCTypesRepository } from '../../repositories/IACCTypesRepository';
import { IDeleteACCTypeRequestDTO } from './DeleteACCTypeDTO';

export class DeleteACCTypeUseCase {
  private accTypesRepository;

  constructor(accTypesRepository: IACCTypesRepository) {
    this.accTypesRepository = accTypesRepository;
  }

  async execute(data: IDeleteACCTypeRequestDTO): Promise<void> {
    const accsLength = await this.accTypesRepository.getACCsLength(data);

    if (accsLength > 0)
      throw new Error('Este Tipo de ACC possui ACCs associadas a ele.');

    await this.accTypesRepository.delete(data);
  }
}
