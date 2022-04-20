import { ACC } from '../model/ACC';
import { IShowACCDTO } from '../useCases/ShowACC/ShowACCDTO';
import { IPaginatedArray } from '../../../providers/IArrayPaginatorProvider';
import { IDeleteACCRequestDTO } from '../useCases/DeleteACC/DeleteACCDTO';
import { IIndexACCRequestDTO } from '../useCases/IndexACC/IndexACCDTO';
import { IUpdatedACC } from '../useCases/UpdateACC/UpdateACCDTO';

export interface IACCsRepository {
  index(data: IIndexACCRequestDTO): Promise<IPaginatedArray>;
  show(data: IShowACCDTO): Promise<ACC>;
  create(acc: ACC): Promise<void>;
  update(acc: IUpdatedACC): Promise<void>;
  delete(data: IDeleteACCRequestDTO): Promise<void>;
}
