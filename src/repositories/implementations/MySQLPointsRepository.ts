import { getRepository, Repository } from 'typeorm';
import {
  IACCPoints,
  IPointsByStatus,
  IPointsRepository,
} from '../IPointsRepository';
import { ACC } from '../../entities/ACC';

export class MySQLPointsRepository implements IPointsRepository {
  public async getPointsByStatus(data: IPointsByStatus): Promise<IACCPoints[]> {
    const { status_id, user_id } = data;
    const accRepository = getRepository(ACC);

    const points = await accRepository
      .createQueryBuilder('acc')
      .leftJoinAndSelect('acc.acc_status', 'acc_status')
      .leftJoinAndSelect('acc.acc_type', 'acc_type')
      .leftJoinAndSelect(
        'acc_type.unity_of_measurement',
        'unity_of_measurement',
      )
      .leftJoinAndSelect('acc.user', 'user')
      .leftJoinAndSelect('acc.acc_variant', 'acc_variant')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.course', 'course')
      .select('SUM(acc.quantity * acc_variant.points_per_unity)', 'points')
      .addSelect('acc_status.id', 'status_id')
      .addSelect('acc_type.point_limit', 'limit')
      .groupBy('acc_type.id')
      .where('user.id = :id AND acc_status.id = :id_status', {
        id: user_id,
        id_status: status_id,
      })
      .getRawMany();

    return points as IACCPoints[];
  }
}
