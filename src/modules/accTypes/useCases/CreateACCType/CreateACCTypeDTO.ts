import { ACCVariant } from '../../../accVariants/model/ACCVariant';
import { UnityOfMeasurement } from '../../../../entities/UnityOfMeasurement';

export interface ICreateACCTypeRequestDTO {
  name: string;
  point_limit: number;
  description: string;
  unity_of_measurement: UnityOfMeasurement;
  acc_variants: ACCVariant[];
}
