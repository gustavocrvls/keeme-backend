import { ACCAssessment } from '../../../../entities/ACCAssessment';
import { ACCStatus } from '../../../../entities/ACCStatus';
import { IACCsAssessmentsRepository } from '../../repositories/IACCsAssessmentsRepository';
import { IACCsRepository } from '../../../accs/repositories/IACCsRepository';
import { ICreateACCAssessmentDTO } from './CreateACCAssessmentDTO';

export class CreateACCAssessmentUseCase {
  private accsAssessmentsRepository: IACCsAssessmentsRepository;

  private accsRepository: IACCsRepository;

  constructor(
    accsAssessmentsRepository: IACCsAssessmentsRepository,
    accsRepository: IACCsRepository,
  ) {
    this.accsAssessmentsRepository = accsAssessmentsRepository;
    this.accsRepository = accsRepository;
  }

  async execute(accAssessment: ICreateACCAssessmentDTO): Promise<void> {
    const assessment = await this.accsAssessmentsRepository.showByACC(
      accAssessment.acc,
    );

    if (assessment) throw new Error('ACC Assessment already exists!');

    this.accsAssessmentsRepository.create(new ACCAssessment(accAssessment));

    this.accsRepository.update({
      id: accAssessment.acc,
      acc_status: new ACCStatus({}, accAssessment.acc_status),
    });
  }
}
