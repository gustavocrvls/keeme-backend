import TipoDeAcc from '../models/TipoDeAcc';
import { IPaginatedArray } from '../providers/IArrayPaginatorProvider';
import { IIndexACCTypeRequestDTO } from '../useCases/IndexACCType/IndexACCTypeDTO';
import { IShowACCTypeDTO } from '../useCases/ShowACCType/ShowACCTypeDTO';
import { IDeleteACCTypeRequestDTO } from '../useCases/DeleteACCType/DeleteACCTypeDTO';
import { IIndexACCTypeWithUserPointsRequestDTO } from '../useCases/IndexACCTypeWithUserPoints/IndexACCTypeWithUserPointsDTO';

export interface IACCTypeWithUserACCs {
  id: number;
  nome: string;
  limite_de_pontos: number;
  descricao: string;
  unidade_de_medida: {
    id: number;
    nome: string;
  };
  accs: {
    quantidade: number;
    variante_de_acc: {
      pontos_por_unidade: number;
    };
    status_da_acc: {
      id: number;
    };
  }[];
}

export interface IACCTypesRepository {
  index(data: IIndexACCTypeRequestDTO): Promise<IPaginatedArray>;
  show(data: IShowACCTypeDTO): Promise<TipoDeAcc>;
  save(accType: TipoDeAcc): Promise<void>;
  delete(data: IDeleteACCTypeRequestDTO): Promise<void>;

  getACCsLength(data: IDeleteACCTypeRequestDTO): Promise<number>;
  getACCTypeByUser(
    data: IIndexACCTypeWithUserPointsRequestDTO,
  ): Promise<IACCTypeWithUserACCs[]>;
}
