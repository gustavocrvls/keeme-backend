import { getRepository, Like, Repository } from 'typeorm';
import UnidadeDeMedida from '../../models/UnidadeDeMedida';
import { IIndexUnityOfMeasurementDTO } from '../../useCases/IndexUnityOfMeasurement/IndexUnityOfMeasurementDTO';
import { IUnitsOfMeasurementRepository } from '../IUnitsOfMeasurementRepository';

export class MySQLUnityOfMeasurementRepository
  implements IUnitsOfMeasurementRepository {
  private coursesRepository: Repository<UnidadeDeMedida>;

  async index(data: IIndexUnityOfMeasurementDTO): Promise<UnidadeDeMedida[]> {
    const { nome, sortField } = data;
    let { sortOrder } = data;

    this.coursesRepository = getRepository(UnidadeDeMedida);
    let unitsOfMeasurementQuery = await this.coursesRepository.createQueryBuilder(
      'unidades_de_medida',
    );

    if (nome)
      unitsOfMeasurementQuery = unitsOfMeasurementQuery.where({
        nome: Like(`%${nome}%`),
      });
    if (!sortOrder) sortOrder = 'ASC';
    if (sortField)
      unitsOfMeasurementQuery = unitsOfMeasurementQuery.orderBy({
        [sortField]: sortOrder,
      });

    const unitsOfMeasurement = await unitsOfMeasurementQuery.getMany();

    return unitsOfMeasurement;
  }
}
