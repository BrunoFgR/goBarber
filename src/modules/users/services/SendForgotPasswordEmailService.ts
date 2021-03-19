import { injectable, inject } from 'tsyringe';

// import AppErrors from '@shared/errors/AppErrors';

import IUserRepository from '../repositories/IUserRepository';
// import User from '../infra/typeorm/entities/User';

interface IRequest {
   email: string;
}

@injectable()
class SendForgotPasswordEmailService {
   constructor(
      @inject('UserRepository')
      private usersRepository: IUserRepository,
   ) {}

   public async execute(data: IRequest): Promise<void> {}
}

export default SendForgotPasswordEmailService;
