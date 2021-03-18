import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import AppErrors from '@shared/errors/AppErrors';
import authConfig from '@config/auth';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
   email: string;
   password: string;
}

interface IResponse {
   user: User;
   token: string;
}

@injectable()
class AuthenticateUserService {
   constructor(
      @inject('UserRepository')
      private usersRepository: IUserRepository,

      @inject('HashProvider')
      private hashProvider: IHashProvider,
   ) {}

   public async execute({ email, password }: IRequest): Promise<IResponse> {
      const user = await this.usersRepository.findByEmail(email);

      if (!user) {
         throw new AppErrors('Incorrect email/password combination.', 401);
      }

      const passwordMatch = await this.hashProvider.compareHash(
         password,
         user.password,
      );

      if (!passwordMatch) {
         throw new AppErrors('Incorrect email/password combination.', 401);
      }

      const { secret, expiresIn } = authConfig.jwt;

      const token = sign({}, secret, {
         subject: user.id,
         expiresIn,
      });

      return {
         user,
         token,
      };
   }
}

export default AuthenticateUserService;
