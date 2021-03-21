import TipoDeAcc from '../../models/TipoDeAcc';
import { IACCTypesRepository } from '../../repositories/IACCTypesRepository';
import { IShowACCTypeDTO } from './ShowACCTypeDTO';

export class ShowACCTypeUseCase {
  private accTypeRepository;

  constructor(accTypeRepository: IACCTypesRepository) {
    this.accTypeRepository = accTypeRepository;
  }

  async execute(data: IShowACCTypeDTO): Promise<TipoDeAcc> {
    const accType = await this.accTypeRepository.show(data);
    return accType;
  }
}
