import { ACCType } from '../../model/ACCType';
import { IACCTypesRepository } from '../../repositories/IACCTypesRepository';
import { ICreateACCTypeRequestDTO } from './CreateACCTypeDTO';

export class CreateACCTypeUseCase {
  private accTypesRepository;

  constructor(accTypesRepository: IACCTypesRepository) {
    this.accTypesRepository = accTypesRepository;
  }

  async execute(data: ICreateACCTypeRequestDTO): Promise<void> {
    const accType = new ACCType(data);
    this.accTypesRepository.create(accType);
  }
}
