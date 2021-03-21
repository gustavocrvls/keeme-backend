import TipoDeAcc from '../models/TipoDeAcc';
import { IPaginatedArray } from '../providers/IArrayPaginatorProvider';
import { IIndexACCTypeRequestDTO } from '../useCases/IndexACCType/IndexACCTypeDTO';
import { IShowACCTypeDTO } from '../useCases/ShowACCType/ShowACCTypeDTO';
import { IDeleteACCTypeRequestDTO } from '../useCases/DeleteACCType/DeleteACCTypeDTO';

export interface IACCTypesRepository {
  index(data: IIndexACCTypeRequestDTO): Promise<IPaginatedArray>;
  show(data: IShowACCTypeDTO): Promise<TipoDeAcc>;
  save(accType: TipoDeAcc): Promise<void>;
  delete(data: IDeleteACCTypeRequestDTO): Promise<void>;

  getACCsLength(data: IDeleteACCTypeRequestDTO): Promise<number>;
}
