import { getRepository, Repository } from 'typeorm';
import {
  IACCPoints,
  IPointsByStatus,
  IPointsRepository,
} from '../IPointsRepository';
import { ACC } from '../../entities/ACC';

export class MySQLPointsRepository implements IPointsRepository {
  private accRepository: Repository<ACC>;

  public async getPointsByStatus(data: IPointsByStatus): Promise<IACCPoints[]> {
    const { status_id, user_id } = data;
    this.accRepository = getRepository(ACC);

    const points = await this.accRepository
      .createQueryBuilder('acc')
      .leftJoinAndSelect('acc.status_da_acc', 'status_da_acc')
      .leftJoinAndSelect('acc.tipo_de_acc', 'tipo_de_acc')
      .leftJoinAndSelect('tipo_de_acc.unidade_de_medida', 'unidade_de_medida')
      .leftJoinAndSelect('acc.usuario', 'usuario')
      .leftJoinAndSelect('acc.variante_de_acc', 'variante_de_acc')
      .leftJoinAndSelect('usuario.perfil', 'perfil')
      .leftJoinAndSelect('usuario.curso', 'curso')
      .select(
        'SUM(acc.quantidade * variante_de_acc.pontos_por_unidade)',
        'points',
      )
      .addSelect('status_da_acc.id', 'status_id')
      .addSelect('tipo_de_acc.limite_de_pontos', 'limit')
      .groupBy('tipo_de_acc.id')
      .where('usuario.id = :id AND status_da_acc.id = :id_status', {
        id: user_id,
        id_status: status_id,
      })
      .getRawMany();

    return points as IACCPoints[];
  }
}
