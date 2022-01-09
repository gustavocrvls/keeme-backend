import { ACCVariant } from '../../../../entities/ACCVariant';
import { UnityOfMeasurement } from '../../../../entities/UnityOfMeasurement';

export interface IUpdateACCTypeRequestDTO {
  id: number;
  name?: string;
  point_limit?: number;
  description?: string;
  unity_of_measurement?: UnityOfMeasurement;
  acc_variants?: ACCVariant[];
}
