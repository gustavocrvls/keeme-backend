import { getRepository, Repository } from 'typeorm';
import { ACCVariant } from '../../entities/ACCVariant';
import { IACCVariantsRepository } from '../IACCVariantsRepository';

export class MySQLACCVariantsRepository implements IACCVariantsRepository {
  private accVariantsRepository: Repository<ACCVariant>;

  async create(accVariant: ACCVariant): Promise<void> {
    this.accVariantsRepository = getRepository(ACCVariant);
    await this.accVariantsRepository.save(accVariant);
  }

  async delete(id: number): Promise<void> {
    this.accVariantsRepository = getRepository(ACCVariant);
    await this.accVariantsRepository.delete({ id });
  }

  async deleteByACCType(acc_type_id: number): Promise<void> {
    this.accVariantsRepository = getRepository(ACCVariant);
    await this.accVariantsRepository.delete({ acc_type: { id: acc_type_id } });
  }
}
