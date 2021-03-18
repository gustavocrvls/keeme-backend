import { IMailProvider } from '../../providers/IMailProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';

export class CreateUserUseCase {
  private usersRepository;

  private mailProvider;

  constructor(usersRepository: IUsersRepository, mailProvider: IMailProvider) {
    this.usersRepository = usersRepository;
    this.mailProvider = mailProvider;
  }

  async execute(data: ICreateUserRequestDTO): Promise<void> {
    const userAlreadyExists = this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const user = new User(data);
    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: 'Gustavo',
        email: 'gustavo@email.com',
      },
      from: {
        name: 'Gustavo',
        email: 'teste@email.com',
      },
      subject: 'Bem vindo!',
      body: 'Yoooo!',
    });
  }
}
