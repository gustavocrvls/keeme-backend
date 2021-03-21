import { IPaginatedArray } from '../../providers/IArrayPaginatorProvider';
import { IACCTypesRepository } from '../../repositories/IACCTypesRepository';
import { IIndexACCTypeRequestDTO } from './IndexACCTypeDTO';

export class IndexACCTypeUseCase {
  private accTypesRepository;

  constructor(accTypesRepository: IACCTypesRepository) {
    this.accTypesRepository = accTypesRepository;
  }

  async execute(data: IIndexACCTypeRequestDTO): Promise<IPaginatedArray> {
    const accTypes = await this.accTypesRepository.index(data);
    return accTypes;
  }
}
