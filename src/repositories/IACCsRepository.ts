import { IPaginatedArray } from '../providers/IArrayPaginatorProvider';
import { IIndexACCRequestDTO } from '../useCases/IndexACC/IndexACCDTO';

export interface IACCsRepository {
  index(data: IIndexACCRequestDTO): Promise<IPaginatedArray>;
}
