import TipoDeAcc from '../../models/TipoDeAcc';
import { IACCTypesRepository } from '../../repositories/IACCTypesRepository';
import { ICreateACCTypeRequestDTO } from './CreateACCTypeDTO';

export class CreateACCTypeUseCase {
  private accTypesRepository;

  constructor(accTypesRepository: IACCTypesRepository) {
    this.accTypesRepository = accTypesRepository;
  }

  async execute(data: ICreateACCTypeRequestDTO): Promise<void> {
    const accType = new TipoDeAcc(data);
    this.accTypesRepository.save(accType);
  }
}
