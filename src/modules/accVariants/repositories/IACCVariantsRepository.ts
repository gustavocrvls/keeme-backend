import { ACCVariant } from '../model/ACCVariant';

export interface IACCVariant {
  id?: number;
  description?: string;
  points_per_unity: number;
  acc_type: number;
}

export interface IACCVariantsRepository {
  create(accVariant: ACCVariant): Promise<void>;
  delete(id: number): Promise<void>;
  deleteByACCType(acc_type_id: number): Promise<void>;
}
