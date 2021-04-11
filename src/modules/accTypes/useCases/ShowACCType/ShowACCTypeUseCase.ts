import { ACCType } from '../../../../entities/ACCType';
import { IACCTypesRepository } from '../../../../repositories/IACCTypesRepository';
import { IShowACCTypeDTO } from './ShowACCTypeDTO';

export class ShowACCTypeUseCase {
  private accTypesRepository;

  constructor(accTypesRepository: IACCTypesRepository) {
    this.accTypesRepository = accTypesRepository;
  }

  async execute(data: IShowACCTypeDTO): Promise<ACCType> {
    const accType = await this.accTypesRepository.show(data);
    return accType;
  }
}
