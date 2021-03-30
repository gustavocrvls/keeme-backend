import { IACCsRepository } from '../../../repositories/IACCsRepository';
import {
  IShowACCWithUserRequestDTO,
  IShowACCWithUserResponseDTO,
} from '../dtos/ShowACCWithUserDTO';

export class ShowACCWithUserService {
  private accsRepository;

  constructor(accsRepository: IACCsRepository) {
    this.accsRepository = accsRepository;
  }

  async execute(
    data: IShowACCWithUserRequestDTO,
  ): Promise<IShowACCWithUserResponseDTO> {
    const accType = await this.accsRepository.getWithUser(data);
    return accType;
  }
}
