import { injectable, inject } from 'tsyringe';

import AppErrors from '@shared/errors/AppErrors';

import IMailProvider from '@shared/container/providers/mailProvider/models/IEmailProvider';
import IUserRepository from '../repositories/IUserRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
// import User from '../infra/typeorm/entities/User';

interface IRequest {
   email: string;
}

@injectable()
class SendForgotPasswordEmailService {
   constructor(
      @inject('UserRepository')
      private usersRepository: IUserRepository,

      @inject('MailProvider')
      private mailProvider: IMailProvider,

      @inject('UserTokenRepository')
      private userTokenRepository: IUserTokenRepository,
   ) {}

   public async execute({ email }: IRequest): Promise<void> {
      const user = await this.usersRepository.findByEmail(email);

      if (!user) {
         throw new AppErrors('User does not exists.');
      }

      await this.userTokenRepository.generate(user.id);

      await this.mailProvider.sendEmail(
         email,
         'Predido de recuperação de senha recebida',
      );
   }
}

export default SendForgotPasswordEmailService;
