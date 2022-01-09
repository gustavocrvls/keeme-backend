import { ACCVariant } from '../../../accVariants/model/ACCVariant';
import { UnityOfMeasurement } from '../../../unitsOfMeasurement/model/UnityOfMeasurement';

export interface ICreateACCTypeRequestDTO {
  name: string;
  point_limit: number;
  description: string;
  unity_of_measurement: UnityOfMeasurement;
  acc_variants: ACCVariant[];
}
