import { IPaginatedArray } from '../providers/IArrayPaginatorProvider';
import { IDeleteACCRequestDTO } from '../useCases/DeleteACC/DeleteACCDTO';
import { IIndexACCRequestDTO } from '../useCases/IndexACC/IndexACCDTO';

export interface IACCsRepository {
  index(data: IIndexACCRequestDTO): Promise<IPaginatedArray>;
  delete(data: IDeleteACCRequestDTO): Promise<void>;
}
