import { User } from '../../model/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userAlreadyExists = this.usersRepository.findById(user_id);

    if (userAlreadyExists.admin === false) {
      throw new Error('You do not have administrator privileges.');
    }

    if (!userAlreadyExists) {
      throw new Error('User not exists.');
    }

    const users = this.usersRepository.list();

    return users;
  }
}

export { ListAllUsersUseCase };
