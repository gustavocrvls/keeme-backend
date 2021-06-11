import { ACC } from '../entities/ACC';
import { IShowACCDTO } from '../modules/accs/useCases/ShowACC/ShowACCDTO';
import { IPaginatedArray } from '../providers/IArrayPaginatorProvider';
import { IDeleteACCRequestDTO } from '../modules/accs/useCases/DeleteACC/DeleteACCDTO';
import { IIndexACCRequestDTO } from '../modules/accs/useCases/IndexACC/IndexACCDTO';
import { IUpdatedACC } from '../modules/accs/useCases/UpdateACC/UpdateACCDTO';

export interface IACCsRepository {
  index(data: IIndexACCRequestDTO): Promise<IPaginatedArray>;
  show(data: IShowACCDTO): Promise<ACC>;
  create(acc: ACC): Promise<void>;
  update(acc: IUpdatedACC): Promise<void>;
  delete(data: IDeleteACCRequestDTO): Promise<void>;
}
