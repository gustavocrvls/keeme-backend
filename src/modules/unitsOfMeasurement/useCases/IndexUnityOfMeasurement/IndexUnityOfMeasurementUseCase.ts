import { IPaginatedArray } from '../../../../providers/IArrayPaginatorProvider';
import { IUnitsOfMeasurementRepository } from '../../../../repositories/IUnitsOfMeasurementRepository';
import { IIndexUnityOfMeasurementDTO } from './IndexUnityOfMeasurementDTO';

export class IndexUnityOfMeasurementUseCase {
  private unitsOfMeasurementRepository;

  constructor(unitsOfMeasurementRepository: IUnitsOfMeasurementRepository) {
    this.unitsOfMeasurementRepository = unitsOfMeasurementRepository;
  }

  async execute(data: IIndexUnityOfMeasurementDTO): Promise<IPaginatedArray> {
    const unitsOfMeasurement = await this.unitsOfMeasurementRepository.index(
      data,
    );
    return unitsOfMeasurement;
  }
}
