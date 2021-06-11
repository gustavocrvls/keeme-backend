import { getRepository } from 'typeorm';
import { ACCAssessment } from '../../entities/ACCAssessment';
import { IACCsAssessmentsRepository } from '../IACCsAssessmentsRepository';

export class MySQLACCsAssessmentsRepository
  implements IACCsAssessmentsRepository
{
  async create(accAssessment: ACCAssessment): Promise<void> {
    const accAssessmentRepository = getRepository(ACCAssessment);

    await accAssessmentRepository.save(accAssessment);
  }
}
