import { ACC } from '../entities/ACC';
import {
  IShowACCWithUserRequestDTO,
  IShowACCWithUserResponseDTO,
} from '../modules/accs/dtos/ShowACCWithUserDTO';
import { IShowACCDTO } from '../modules/accs/useCases/ShowACC/ShowACCDTO';
import { IPaginatedArray } from '../providers/IArrayPaginatorProvider';
import { IDeleteACCRequestDTO } from '../useCases/DeleteACC/DeleteACCDTO';
import { IIndexACCRequestDTO } from '../useCases/IndexACC/IndexACCDTO';

export interface IACCsRepository {
  index(data: IIndexACCRequestDTO): Promise<IPaginatedArray>;
  show(data: IShowACCDTO): Promise<ACC>;
  create(acc: ACC): Promise<void>;
  delete(data: IDeleteACCRequestDTO): Promise<void>;

  getWithUser(
    data: IShowACCWithUserRequestDTO,
  ): Promise<IShowACCWithUserResponseDTO>;
}
