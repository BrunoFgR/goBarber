import { injectable, inject } from 'tsyringe';

import AppErrors from '@shared/errors/AppErrors';

import IUserRepository from '../repositories/IUserRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
   user_id: string;
}

@injectable()
class ShowProfileService {
   constructor(
      @inject('UserRepository')
      private usersRepository: IUserRepository,
   ) {}

   public async execute({ user_id }: IRequest): Promise<User> {
      const user = await this.usersRepository.findById(user_id);

      if (!user) {
         throw new AppErrors('User not found.');
      }

      return user;
   }
}

export default ShowProfileService;
