import { IPaginatedArray } from '../../providers/IArrayPaginatorProvider';
import { IACCTypesRepository } from '../../repositories/IACCTypesRepository';
import { IIndexACCTypeRequestDTO } from './IndexACCTypeDTO';

export class IndexACCTypeUseCase {
  private accTypeRepository;

  constructor(accTypeRepository: IACCTypesRepository) {
    this.accTypeRepository = accTypeRepository;
  }

  async execute(data: IIndexACCTypeRequestDTO): Promise<IPaginatedArray> {
    const accTypes = await this.accTypeRepository.index(data);
    return accTypes;
  }
}
