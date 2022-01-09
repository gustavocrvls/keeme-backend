import { getRepository } from 'typeorm';
import { ACCVariant } from '../../model/ACCVariant';
import { IACCVariantsRepository } from '../IACCVariantsRepository';

export class MySQLACCVariantsRepository implements IACCVariantsRepository {
  async create(accVariant: ACCVariant): Promise<void> {
    const accVariantsRepository = getRepository(ACCVariant);
    await accVariantsRepository.save(accVariant);
  }

  async delete(id: number): Promise<void> {
    const accVariantsRepository = getRepository(ACCVariant);
    await accVariantsRepository.delete({ id });
  }

  async deleteByACCType(acc_type_id: number): Promise<void> {
    const accVariantsRepository = getRepository(ACCVariant);
    await accVariantsRepository.delete({ acc_type: { id: acc_type_id } });
  }
}
