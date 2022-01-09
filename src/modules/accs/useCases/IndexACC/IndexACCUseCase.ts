import { IPaginatedArray } from '../../../../providers/IArrayPaginatorProvider';
import { IACCsRepository } from '../../repositories/IACCsRepository';
import { IIndexACCRequestDTO } from './IndexACCDTO';

export class IndexACCUseCase {
  private accsRepository;

  constructor(accRepository: IACCsRepository) {
    this.accsRepository = accRepository;
  }

  async execute(data: IIndexACCRequestDTO): Promise<IPaginatedArray> {
    const accs = await this.accsRepository.index(data);
    return accs;
  }
}
