import { injectable, inject } from 'tsyringe';

import AppErrors from '@shared/errors/AppErrors';

import IUserRepository from '../repositories/IUserRepository';
import User from '../infra/typeorm/entities/User';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
   name: string;
   email: string;
   password: string;
}

@injectable()
class CreateUserService {
   constructor(
      @inject('UserRepository')
      private usersRepository: IUserRepository,

      @inject('HashProvider')
      private hashProvider: IHashProvider,
   ) {}

   public async execute({ name, email, password }: IRequest): Promise<User> {
      const checkUserExists = await this.usersRepository.findByEmail(email);

      if (checkUserExists) {
         throw new AppErrors('Email address already used.');
      }

      const hashedPassword = await this.hashProvider.generateHash(password);

      const user = this.usersRepository.create({
         name,
         email,
         password: hashedPassword,
      });

      return user;
   }
}

export default CreateUserService;
