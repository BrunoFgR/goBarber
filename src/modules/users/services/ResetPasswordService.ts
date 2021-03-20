import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppErrors from '@shared/errors/AppErrors';

import IUserTokenRepository from '../repositories/IUserTokenRepository';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

// import User from '../infra/typeorm/entities/User';

interface IRequest {
   token: string;
   password: string;
}

@injectable()
class ResetPasswordService {
   constructor(
      @inject('UserRepository')
      private usersRepository: IUserRepository,

      @inject('MailProvider')
      private userTokenRepository: IUserTokenRepository,

      @inject('HashProvider')
      private hashProvider: IHashProvider,
   ) {}

   public async execute({ token, password }: IRequest): Promise<void> {
      const userToken = await this.userTokenRepository.findByToken(token);

      if (!userToken) {
         throw new AppErrors('User token does not exists');
      }

      const user = await this.usersRepository.findById(userToken.user_id);

      if (!user) {
         throw new AppErrors('User does not exists');
      }

      const tokenCreatedAt = userToken.created_at;
      const compareDate = addHours(tokenCreatedAt, 2);

      if (isAfter(Date.now(), compareDate)) {
         throw new AppErrors('Token expired.');
      }

      user.password = await this.hashProvider.generateHash(password);

      this.usersRepository.save(user);
   }
}

export default ResetPasswordService;
