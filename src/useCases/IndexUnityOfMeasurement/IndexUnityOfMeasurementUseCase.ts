import { IPaginatedArray } from '../../providers/IArrayPaginatorProvider';
import { IUnitsOfMeasurementRepository } from '../../repositories/IUnitsOfMeasurementRepository';
import { IIndexUnityOfMeasurementDTO } from './IndexUnityOfMeasurementDTO';

export class IndexUnityOfMeasurementUseCase {
  private unityOfMeasurementRepository;

  constructor(unityOfMeasurementRepository: IUnitsOfMeasurementRepository) {
    this.unityOfMeasurementRepository = unityOfMeasurementRepository;
  }

  async execute(data: IIndexUnityOfMeasurementDTO): Promise<IPaginatedArray> {
    const unitsOfMeasurement = await this.unityOfMeasurementRepository.index(
      data,
    );
    return unitsOfMeasurement;
  }
}
