import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppErrors from '@shared/errors/AppErrors';

import IMailProvider from '@shared/container/providers/mailProvider/models/IEmailProvider';
import IUserRepository from '../repositories/IUserRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

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

      const { token } = await this.userTokenRepository.generate(user.id);

      const forgotPasswordTemplate = path.resolve(
         __dirname,
         '..',
         'views',
         'forgot_password.hbs',
      );

      await this.mailProvider.sendEmail({
         to: {
            name: user.name,
            email: user.email,
         },
         subject: '[GoBarber] Recuperação de senha',
         templateData: {
            file: forgotPasswordTemplate,
            variables: {
               name: user.name,
               link: `http://localhost:3000/reset_password?token=${token}`,
            },
         },
      });
   }
}

export default SendForgotPasswordEmailService;
