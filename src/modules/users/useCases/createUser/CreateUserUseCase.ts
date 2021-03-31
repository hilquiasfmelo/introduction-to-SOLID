import { User } from '../../model/User';
import {
  IUsersRepository,
  ICreateUserDTO,
} from '../../repositories/IUsersRepository';

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ name, email }: ICreateUserDTO): User {
    const userAlreadyExists = this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('This email is already in use.');
    }

    const user = this.usersRepository.create({
      name,
      email,
    });

    return user;
  }
}

export { CreateUserUseCase };
