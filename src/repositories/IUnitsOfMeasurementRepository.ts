import UnidadeDeMedida from '../models/UnidadeDeMedida';
import { IIndexUnityOfMeasurementDTO } from '../useCases/IndexUnityOfMeasurement/IndexUnityOfMeasurementDTO';

export interface IUnitsOfMeasurementRepository {
  index(data: IIndexUnityOfMeasurementDTO): Promise<UnidadeDeMedida[]>;
}
