import { ACCType } from '../../../../entities/ACCType';
import { IACCTypesRepository } from '../../repositories/IACCTypesRepository';
import { IACCVariantsRepository } from '../../../../repositories/IACCVariantsRepository';
import { IUpdateACCTypeRequestDTO } from './UpdateACCTypeDTO';

export class UpdateACCTypeUseCase {
  private accTypesRepository;

  private accVariantsRepository;

  constructor(
    accTypesRepository: IACCTypesRepository,
    accVariantsRepository: IACCVariantsRepository,
  ) {
    this.accTypesRepository = accTypesRepository;
    this.accVariantsRepository = accVariantsRepository;
  }

  async execute(data: IUpdateACCTypeRequestDTO): Promise<void> {
    const accType = data;
    const accVariants = data.acc_variants;

    delete accType.acc_variants;

    const accsLength = await this.accTypesRepository.getACCsLength(data);

    if (accsLength > 0)
      throw new Error('Este Tipo de ACC possui ACCs associadas a ele.');

    await this.accTypesRepository.update(accType);

    if (accVariants) {
      await this.accVariantsRepository.deleteByACCType(accType.id);

      accVariants.forEach(async variant => {
        await this.accVariantsRepository.create({
          ...variant,
          acc_type: new ACCType(accType),
        });
      });
    }
  }
}
