import { ACCType } from '../../../../entities/ACCType';
import { IACCTypesRepository } from '../../../../repositories/IACCTypesRepository';
import { IUpdateACCTypeRequestDTO } from './UpdateACCTypeDTO';

export class UpdateACCTypeUseCase {
  private accTypesRepository;

  constructor(accTypesRepository: IACCTypesRepository) {
    this.accTypesRepository = accTypesRepository;
  }

  async execute(data: IUpdateACCTypeRequestDTO): Promise<void> {
    this.accTypesRepository.update(data);
  }
}
