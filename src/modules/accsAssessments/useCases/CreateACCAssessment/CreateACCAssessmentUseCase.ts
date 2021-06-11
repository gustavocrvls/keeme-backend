import { ACCAssessment } from '../../../../entities/ACCAssessment';
import { IACCsAssessmentsRepository } from '../../../../repositories/IACCsAssessmentsRepository';
import { ICreateACCAssessmentDTO } from './CreateACCAssessmentDTO';

export class CreateACCAssessmentUseCase {
  private accsAssessmentsRepository: IACCsAssessmentsRepository;

  constructor(accsAssessmentsRepository: IACCsAssessmentsRepository) {
    this.accsAssessmentsRepository = accsAssessmentsRepository;
  }

  async execute(accAssessment: ICreateACCAssessmentDTO): Promise<void> {
    this.accsAssessmentsRepository.create(new ACCAssessment(accAssessment));
  }
}
