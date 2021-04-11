import { ACCType } from '../entities/ACCType';
import { IPaginatedArray } from '../providers/IArrayPaginatorProvider';
import { IIndexACCTypeRequestDTO } from '../modules/accTypes/useCases/IndexACCType/IndexACCTypeDTO';
import { IShowACCTypeDTO } from '../modules/accTypes/useCases/ShowACCType/ShowACCTypeDTO';
import { IDeleteACCTypeRequestDTO } from '../modules/accTypes/useCases/DeleteACCType/DeleteACCTypeDTO';
import { IIndexACCTypesWithUserPointsRequestDTO } from '../modules/accTypes/useCases/IndexACCTypesWithUserPoints/IndexACCTypeWithUserPointsDTO';

export interface IACCTypeWithUserACCs {
  id: number;
  name: string;
  point_limit: number;
  description: string;
  unity_of_measurement: {
    id: number;
    name: string;
  };
  acc_variants: {
    id: number;
    points_per_unity: number;
    description: string;
  }[];
  accs: {
    quantity: number;
    acc_variant: {
      points_per_unity: number;
      id: number;
    };
    acc_status: {
      id: number;
    };
  }[];
}

export interface IACCsLength {
  id: number;
}

export interface IACCTypesRepository {
  index(data: IIndexACCTypeRequestDTO): Promise<IPaginatedArray>;
  show(data: IShowACCTypeDTO): Promise<ACCType>;
  save(accType: ACCType): Promise<void>;
  delete(data: IDeleteACCTypeRequestDTO): Promise<void>;

  getACCsLength(data: IACCsLength): Promise<number>;
  getACCTypeByUser(
    data: IIndexACCTypesWithUserPointsRequestDTO,
  ): Promise<IACCTypeWithUserACCs[]>;
  getACCTypesLength(): Promise<number>;
}
