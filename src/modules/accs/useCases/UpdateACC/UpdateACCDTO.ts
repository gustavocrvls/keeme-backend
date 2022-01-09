import { ACCStatus } from '../../../accStatus/model/ACCStatus';
import { ACCType } from '../../../../entities/ACCType';
import { ACCVariant } from '../../../../entities/ACCVariant';

export interface IUpdateACCDTO {
  id: number;
  quantity: number;
  description: string;
  user: number;
  acc_type: number;
  acc_variant: number;
  certificate: Express.Multer.File;
}

export interface IUpdatedACC {
  id: number;
  quantity?: number;
  description?: string;
  acc_type?: ACCType;
  acc_variant?: ACCVariant;
  acc_status?: ACCStatus;
  certificate?: string;
}
