import { IPaginatedArray } from '../providers/IArrayPaginatorProvider';
import { IIndexUnityOfMeasurementDTO } from '../useCases/IndexUnityOfMeasurement/IndexUnityOfMeasurementDTO';

export interface IUnitsOfMeasurementRepository {
  index(data: IIndexUnityOfMeasurementDTO): Promise<IPaginatedArray>;
}
