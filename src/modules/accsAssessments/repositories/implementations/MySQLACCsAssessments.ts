import { getRepository } from 'typeorm';
import { ACCAssessment } from '../../../../entities/ACCAssessment';
import { IACCsAssessmentsRepository } from '../IACCsAssessmentsRepository';

export class MySQLACCsAssessmentsRepository
  implements IACCsAssessmentsRepository
{
  async showByACC(accId: number): Promise<ACCAssessment> {
    const accAssessmentRepository = getRepository(ACCAssessment);

    const accAssessment = await accAssessmentRepository.findOneOrFail({
      where: { acc: accId },
    });

    return accAssessment;
  }

  async create(accAssessment: ACCAssessment): Promise<void> {
    const accAssessmentRepository = getRepository(ACCAssessment);

    await accAssessmentRepository.save(accAssessment);
  }
}
