import TipoDeAcc from '../models/TipoDeAcc';
import { IPaginatedArray } from '../providers/IArrayPaginatorProvider';
import { IIndexACCTypeRequestDTO } from '../useCases/IndexACCType/IndexACCTypeDTO';
import { IShowACCTypeDTO } from '../useCases/ShowACCType/ShowACCTypeDTO';

export interface IACCTypesRepository {
  index(data: IIndexACCTypeRequestDTO): Promise<IPaginatedArray>;
  show(data: IShowACCTypeDTO): Promise<TipoDeAcc>;
  save(accType: TipoDeAcc): Promise<void>;
}
