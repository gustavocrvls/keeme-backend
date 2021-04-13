import { ACC } from '../entities/ACC';
import { IShowACCDTO } from '../modules/accs/useCases/ShowACC/ShowACCDTO';
import { IPaginatedArray } from '../providers/IArrayPaginatorProvider';
import { IDeleteACCRequestDTO } from '../modules/accs/useCases/DeleteACC/DeleteACCDTO';
import { IIndexACCRequestDTO } from '../modules/accs/useCases/IndexACC/IndexACCDTO';

export interface IACCsRepository {
  index(data: IIndexACCRequestDTO): Promise<IPaginatedArray>;
  show(data: IShowACCDTO): Promise<ACC>;
  create(acc: ACC): Promise<void>;
  delete(data: IDeleteACCRequestDTO): Promise<void>;
}
