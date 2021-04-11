import { IPaginatedArray } from '../providers/IArrayPaginatorProvider';
import { IIndexUnityOfMeasurementDTO } from '../modules/unitsOfMeasurement/useCases/IndexUnityOfMeasurement/IndexUnityOfMeasurementDTO';

export interface IUnitsOfMeasurementRepository {
  index(data: IIndexUnityOfMeasurementDTO): Promise<IPaginatedArray>;
}
